import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Curriculum from "@/models/Curriculum";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  try {
    const slug = slugify(body.title, { lower: true });
    body.slug = slug;
    const curriculum = await Curriculum.create(body);
    return NextResponse.json(curriculum);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const curriculums = await Curriculum.find({}.sort({ createdAt: -1 }));
    return NextResponse.json(curriculums);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
