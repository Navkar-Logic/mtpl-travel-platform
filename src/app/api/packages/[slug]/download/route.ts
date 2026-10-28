import { NextRequest, NextResponse } from "next/server";
import { getPackageBySlug } from "@/features/packages/data/packages";
import { storage } from "@/lib/storage";
import { FileNotFoundError, ValidationError } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!slug || slug.includes("/") || slug.includes("\\") || slug.includes("..")) {
      return new NextResponse("Invalid package identifier", { status: 400 });
    }

    const pkg = getPackageBySlug(slug);
    if (!pkg) {
      return new NextResponse("Package not found", { status: 404 });
    }

    const storageKey = pkg.pdfDownloadKey;
    if (!storageKey) {
      return new NextResponse("Package document not found", { status: 404 });
    }

    if (storageKey.includes("/") || storageKey.includes("\\") || storageKey.includes("..")) {
      return new NextResponse("Invalid storage reference", { status: 400 });
    }

    const exists = await storage.exists(storageKey, "public");
    if (!exists) {
      return new NextResponse("Package document not found", { status: 404 });
    }

    const { sizeBytes, mimeType } = await storage.getMetadata(storageKey, "public");
    const stream = await storage.getStream(storageKey, "public");

    // Clean, browser-friendly filename for content disposition
    const safeDownloadName = `${pkg.slug}.pdf`;

    const webStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
      cancel() {
        stream.destroy();
      },
    });

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": mimeType || "application/pdf",
        "Content-Length": sizeBytes.toString(),
        "Content-Disposition": `attachment; filename="${safeDownloadName}"`,
        "Cache-Control": "public, max-age=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof FileNotFoundError) {
      return new NextResponse("Package document not found", { status: 404 });
    }
    if (error instanceof ValidationError) {
      return new NextResponse("Bad request", { status: 400 });
    }
    return new NextResponse("Internal server error", { status: 500 });
  }
}
