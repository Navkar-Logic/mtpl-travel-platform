import { LocalFilesystemProvider } from './providers/local-filesystem';
import { StorageProvider } from './types';

// Depending on the MEDIA_STORAGE_PROVIDER, we can switch implementations.
// For now, only local-filesystem is required and object storage is future migration.

export function getStorageProvider(): StorageProvider {
  const providerType = process.env.MEDIA_STORAGE_PROVIDER || 'local';
  
  if (providerType === 'local') {
    return new LocalFilesystemProvider();
  }
  
  throw new Error(`Unsupported storage provider: ${providerType}`);
}

export const storage = getStorageProvider();

export * from './types';
export * from './errors';
export * from './validation';
