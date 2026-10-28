import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'node:fs/promises';
import path from 'node:path';

// In-memory cache for high-frequency media serving
interface CachedMedia {
  buffer: Buffer;
  mimeType: string;
  sizeBytes: number;
  mtimeMs: number;
  etag: string;
}

const mediaCache = new Map<string, CachedMedia>();
const MAX_CACHE_ITEMS = 300;

function inferMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.pdf') return 'application/pdf';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    
    if (!key || key.includes('/') || key.includes('\\') || key.includes('..')) {
      return new NextResponse('Invalid key', { status: 400 });
    }

    // 1. Resolve secure local path
    const storageRoot = path.resolve(/*turbopackIgnore: true*/ process.env.MEDIA_STORAGE_ROOT || './storage/media');
    const publicFolder = path.resolve(storageRoot, 'public');
    let resolvedPath = path.resolve(publicFolder, key);

    if (!resolvedPath.startsWith(publicFolder)) {
      return new NextResponse('Path traversal attempt detected', { status: 400 });
    }

    // 2. Stat file on disk
    let stat: import('node:fs').Stats;
    try {
      stat = await fs.stat(resolvedPath);
    } catch {
      // Fallback for image requests if specific asset is missing
      if (key.endsWith('.webp') || key.endsWith('.jpg') || key.endsWith('.png') || key.endsWith('.jpeg')) {
        resolvedPath = path.resolve('./public/assets/package-fallback.webp');
        try {
          stat = await fs.stat(resolvedPath);
        } catch {
          return new NextResponse('Not found', { status: 404 });
        }
      } else {
        return new NextResponse('Not found', { status: 404 });
      }
    }

    const isDev = process.env.NODE_ENV !== 'production';
    const cacheControlHeader = isDev
      ? 'no-cache, no-store, must-revalidate'
      : 'public, max-age=86400, stale-while-revalidate=604800';

    const etag = `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`;

    // 3. Check in-memory cache if valid for this file version
    const cached = mediaCache.get(key);
    if (cached && cached.mtimeMs === stat.mtimeMs && cached.sizeBytes === stat.size) {
      const ifNoneMatch = request.headers.get('if-none-match');
      if (ifNoneMatch === cached.etag) {
        return new NextResponse(null, {
          status: 304,
          headers: {
            'ETag': cached.etag,
            'Cache-Control': cacheControlHeader,
          },
        });
      }

      return new NextResponse(new Uint8Array(cached.buffer), {
        headers: {
          'Content-Type': cached.mimeType,
          'Content-Length': cached.sizeBytes.toString(),
          'Cache-Control': cacheControlHeader,
          'ETag': cached.etag,
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }

    // 4. File changed or not cached: read file buffer from disk
    const buffer = await fs.readFile(resolvedPath);
    const mimeType = inferMimeType(resolvedPath);
    const sizeBytes = stat.size;

    // Save to in-memory cache (evict oldest if full)
    if (mediaCache.size >= MAX_CACHE_ITEMS) {
      const firstKey = mediaCache.keys().next().value;
      if (firstKey) mediaCache.delete(firstKey);
    }
    mediaCache.set(key, { buffer, mimeType, sizeBytes, mtimeMs: stat.mtimeMs, etag });

    // Handle ETag 304
    const ifNoneMatch = request.headers.get('if-none-match');
    if (ifNoneMatch === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': cacheControlHeader,
        },
      });
    }

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': mimeType,
        'Content-Length': sizeBytes.toString(),
        'Cache-Control': cacheControlHeader,
        'ETag': etag,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}

