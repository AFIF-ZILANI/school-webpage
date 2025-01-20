import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const data = await req.json();
    console.log(data);
    return NextResponse.json({message: "done", success: true}, {status: 200})
}