import 'server-only';
import { constants } from 'node:fs';
import * as fs from 'node:fs/promises';
import { createReadStream, ReadStream } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { StorageProvider, StorageFile, FileVisibility } from '../types';
import { FileNotFoundError, StorageError, ValidationError } from '../errors';

export class LocalFilesystemProvider implements StorageProvider {
  private readonly storageRoot: string;

  constructor(storageRoot?: string) {
    const root = storageRoot || process.env.MEDIA_STORAGE_ROOT || './storage/media';
    this.storageRoot = path.resolve(/*turbopackIgnore: true*/ root);
  }

  // Ensures paths are always inside the storage root
  private getSecurePath(key: string, visibility: FileVisibility): string {
    const visibilityFolder = visibility === 'public' ? 'public' : 'private';
    const resolvedPath = path.resolve(this.storageRoot, visibilityFolder, key);

    if (!resolvedPath.startsWith(path.resolve(this.storageRoot, visibilityFolder))) {
      throw new ValidationError('Path traversal attempt detected');
    }
    
    return resolvedPath;
  }

  private generateKey(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private getExtension(mimeType: string, originalFilename: string): string {
    const ext = path.extname(originalFilename).toLowerCase();
    if (ext) return ext;
    
    const mimeMap: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'application/pdf': '.pdf',
    };
    return mimeMap[mimeType] || '';
  }

  async save(file: StorageFile): Promise<string> {
    const ext = this.getExtension(file.mimeType, file.originalFilename);
    const key = `${this.generateKey()}${ext}`;
    const filePath = this.getSecurePath(key, file.visibility);
    
    const dir = path.dirname(filePath);
    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, file.buffer);
    } catch (error) {
      throw new StorageError(`Failed to save file: ${(error as Error).message}`);
    }
    return key;
  }

  async exists(key: string, visibility: FileVisibility): Promise<boolean> {
    const filePath = this.getSecurePath(key, visibility);
    try {
      await fs.access(filePath, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string, visibility: FileVisibility): Promise<void> {
    const filePath = this.getSecurePath(key, visibility);
    try {
      const exists = await this.exists(key, visibility);
      if (!exists) {
        throw new FileNotFoundError(key);
      }
      await fs.unlink(filePath);
    } catch (error) {
      if (error instanceof StorageError) throw error;
      throw new StorageError(`Failed to delete file: ${(error as Error).message}`);
    }
  }

  async getStream(key: string, visibility: FileVisibility): Promise<ReadStream> {
    const exists = await this.exists(key, visibility);
    if (!exists) {
      throw new FileNotFoundError(key);
    }
    const filePath = this.getSecurePath(key, visibility);
    return createReadStream(filePath);
  }

  async getMetadata(key: string, visibility: FileVisibility): Promise<{ sizeBytes: number; mimeType: string }> {
    const exists = await this.exists(key, visibility);
    if (!exists) {
      throw new FileNotFoundError(key);
    }
    const filePath = this.getSecurePath(key, visibility);
    const stat = await fs.stat(filePath);
    
    // basic mime type inference for local serving
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    else if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.webp') mimeType = 'image/webp';
    else if (ext === '.pdf') mimeType = 'application/pdf';

    return { sizeBytes: stat.size, mimeType };
  }

  getPublicUrl(key: string): string | null {
    // This expects a route at /api/media/[key] to serve public files
    // The requirement says we shouldn't serve public directory directly
    return `/api/media/${encodeURIComponent(key)}`;
  }
}
