import { storage } from './index';
import { StorageFile } from './types';
import { validateFile } from './validation';
import { MediaAsset } from '@/models/media-asset';
import { connectToDatabase } from '@/lib/db/mongoose';
import { StorageError } from './errors';

export class MediaStorageService {
  /**
   * Safely saves a file to the filesystem and its metadata to the database.
   * If database creation fails, it safely cleans up the file from the filesystem.
   */
  static async saveFile(file: StorageFile & { altText?: string }): Promise<string> {
    await connectToDatabase();
    
    // Validate file limits, MIME, magic bytes, path traversal
    validateFile(file);
    
    // Save to filesystem (storage key is generated internally)
    const key = await storage.save(file);
    
    try {
      // Save metadata to MongoDB
      await MediaAsset.create({
        storageKey: key,
        originalFilename: file.originalFilename,
        mimeType: file.mimeType,
        sizeBytes: file.buffer.length,
        category: file.category,
        visibility: file.visibility,
        altText: file.altText,
      });
      return key;
    } catch (error) {
      // If DB creation fails, clean up the filesystem safely
      await storage.delete(key, file.visibility).catch(cleanupError => {
        console.error(`Failed to cleanup file ${key} after DB failure:`, cleanupError);
      });
      throw new StorageError(`Failed to save media metadata: ${(error as Error).message}`);
    }
  }

  /**
   * Deletes a file from the filesystem and its metadata from the database.
   */
  static async deleteFile(key: string, visibility: 'public' | 'private'): Promise<void> {
    await connectToDatabase();
    
    // Delete from DB first, if this fails we haven't lost the file
    const result = await MediaAsset.findOneAndDelete({ storageKey: key, visibility });
    if (!result) {
      throw new StorageError(`Media asset metadata not found for key: ${key}`);
    }
    
    // Delete from filesystem
    await storage.delete(key, visibility).catch(error => {
      console.error(`Metadata deleted but failed to delete file ${key} from filesystem:`, error);
      throw new StorageError(`Failed to delete file from filesystem: ${(error as Error).message}`);
    });
  }
}
