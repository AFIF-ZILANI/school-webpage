// // app/api/upload/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { UploadModel } from '@/models/Upload';

// export async function POST(req: NextRequest) {
//   await connectDB();

//   const { secure_url, public_id } = await req.json();

//   try {
//     const upload = new UploadModel({ imageUrl: secure_url, public_id });
//     await upload.save();

//     return NextResponse.json({ imageUrl: secure_url, public_id });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
//   }
// }
