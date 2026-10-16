import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json({
      success: true,
      service: "database",
      database: "mongodb",
      status: "connected",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        service: "database",
        database: "mongodb",
        status: "disconnected",
      },
      { status: 500 },
    );
  }
}