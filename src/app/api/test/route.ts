import { dbConnect } from "@/lib/db";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json()
    await dbConnect()
    const x = await UserModel.findOne({email: "afifzilani45566@gmail.com"})
    console.log("Test:", x)
    return NextResponse.json({message: "done", data: body.hello}, {status: 200})
}