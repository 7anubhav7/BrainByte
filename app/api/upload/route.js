import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { image } = await req.json();
  await dbConnect();

  try {
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: "ml_default",
    });
    console.log("What upload image route is sending-----", result);
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.log("Error from Upload Route for Cloudinary-----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
