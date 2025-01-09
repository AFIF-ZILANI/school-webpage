import { NextResponse } from "next/server";
import { fetchTeachers } from "@/lib/api-utils";

export async function GET() {
  try {
    const teachers = await fetchTeachers();
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}