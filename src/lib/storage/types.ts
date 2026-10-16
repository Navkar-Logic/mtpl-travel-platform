import { ReadStream } from 'node:fs';

export type FileVisibility = 'public' | 'private';
export type FileCategory = 'images' | 'documents' | 'other';

export interface StorageFile {
  buffer: Buffer;
  mimeType: string;
  originalFilename: string;
  visibility: FileVisibility;
  category: FileCategory;
}

export interface StorageProvider {
  /**
   * Save a file to the storage provider
   * @param file The file to save
   * @returns The generated storage key
   */
  save(file: StorageFile): Promise<string>;

  /**
   * Check if a file exists
   * @param key The storage key
   * @param visibility The expected visibility
   */
  exists(key: string, visibility: FileVisibility): Promise<boolean>;

  /**
   * Delete a file
   * @param key The storage key
   * @param visibility The expected visibility
   */
  delete(key: string, visibility: FileVisibility): Promise<void>;

  /**
   * Get a read stream for a file
   * @param key The storage key
   * @param visibility The expected visibility
   */
  getStream(key: string, visibility: FileVisibility): Promise<ReadStream>;

  /**
   * Get file metadata like size and mime type
   * @param key The storage key
   * @param visibility The expected visibility
   */
  getMetadata(key: string, visibility: FileVisibility): Promise<{ sizeBytes: number; mimeType: string }>;

  /**
   * Get a public URL for a file, if applicable and supported
   * @param key The storage key
   */
  getPublicUrl(key: string): string | null;
}
