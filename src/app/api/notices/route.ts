import { NextResponse } from "next/server";
import { fetchNotices } from "@/lib/api-utils";

export async function GET() {
  try {
    const notices = await fetchNotices();
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // In a real app, we would save to database here
    // For now, just return the data
    return NextResponse.json({
      ...data,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      author: { name: "Mock Teacher" }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}