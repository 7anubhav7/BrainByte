import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";
import slugify from "slugify";
import { BoyRounded } from "@mui/icons-material";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const slug = slugify(body.title);
    body.slug = slug;
    const curriculumCourse = await CurriculumCourse.create(body);
    console.log("Body from POST---", curriculumCourse);
    return NextResponse.json(curriculumCourse);
  } catch (error) {
    console.log("Error from POST of course curriculum--", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
