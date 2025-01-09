import { NextResponse } from "next/server";
import { fetchResults } from "@/lib/api-utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    
    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
    }

    const results = await fetchResults(studentId);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}