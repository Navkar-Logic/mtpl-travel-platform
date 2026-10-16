import { StorageFile } from './types';
import { ValidationError } from './errors';

export const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

// PDF magic number %PDF-
const PDF_MAGIC_BYTES = [0x25, 0x50, 0x44, 0x46, 0x2D];
// JPEG magic numbers FF D8 FF
const JPEG_MAGIC_BYTES = [0xFF, 0xD8, 0xFF];
// PNG magic numbers 89 50 4E 47 0D 0A 1A 0A
const PNG_MAGIC_BYTES = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
// WebP RIFF....WEBP
const WEBP_MAGIC_BYTES_1 = [0x52, 0x49, 0x46, 0x46]; // RIFF
const WEBP_MAGIC_BYTES_2 = [0x57, 0x45, 0x42, 0x50]; // WEBP

function checkMagicBytes(buffer: Buffer, magic: number[], offset = 0): boolean {
  if (buffer.length < offset + magic.length) return false;
  for (let i = 0; i < magic.length; i++) {
    if (buffer[offset + i] !== magic[i]) {
      return false;
    }
  }
  return true;
}

export function validateFileContent(buffer: Buffer, mimeType: string): boolean {
  if (mimeType === 'application/pdf') {
    return checkMagicBytes(buffer, PDF_MAGIC_BYTES);
  } else if (mimeType === 'image/jpeg') {
    return checkMagicBytes(buffer, JPEG_MAGIC_BYTES);
  } else if (mimeType === 'image/png') {
    return checkMagicBytes(buffer, PNG_MAGIC_BYTES);
  } else if (mimeType === 'image/webp') {
    return checkMagicBytes(buffer, WEBP_MAGIC_BYTES_1) && checkMagicBytes(buffer, WEBP_MAGIC_BYTES_2, 8);
  }
  return false;
}

export function validateFile(file: StorageFile): void {
  if (!SUPPORTED_MIME_TYPES.includes(file.mimeType)) {
    throw new ValidationError(`Unsupported MIME type: ${file.mimeType}`);
  }

  let maxSizeMb = 5;
  if (file.mimeType.startsWith('image/')) {
    maxSizeMb = parseInt(process.env.MEDIA_MAX_IMAGE_SIZE_MB || '10', 10);
  } else if (file.mimeType === 'application/pdf') {
    maxSizeMb = parseInt(process.env.MEDIA_MAX_PDF_SIZE_MB || '20', 10);
  }

  const maxSizeBytes = maxSizeMb * 1024 * 1024;
  if (file.buffer.length > maxSizeBytes) {
    throw new ValidationError(`File exceeds maximum size of ${maxSizeMb}MB`);
  }

  if (!validateFileContent(file.buffer, file.mimeType)) {
    throw new ValidationError(`File content does not match reported MIME type`);
  }
  
  if (file.originalFilename.includes('\0')) {
    throw new ValidationError('Filename contains null bytes');
  }
}
