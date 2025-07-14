import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";
import slugify from "slugify";

export async function GET(req, context) {
  await dbConnect();

  try {
    const curriculums = await CurriculumCourse.findOne({
      slug: context?.params?.slug,
    });
    return NextResponse.json(curriculums);
  } catch (error) {
    console.log("Error from getsinglecourse GET-----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
