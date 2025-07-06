import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";

export async function GET(req, context) {
  await dbConnect();

  const slug = context?.params?.slug;
  if (!slug || typeof slug !== "string") {
    return NextResponse.json(
      { err: "Invalid or missing slug parameter" },
      { status: 500 }
    );
  }
  console.log("path sent to route---", slug);
  try {
    let curriculum = await Curriculum.findOne({
      "sections.lectures.slug": slug,
    });
    if (!curriculum) {
      curriculum = await Curriculum.findOne({ slug });
      if (!curriculum) {
        return NextResponse.json(
          { err: "Curriculum not found on second try" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(curriculum);
  } catch (error) {
    console.log("Error in accordion GET route-----", error);
    return NextResponse.json(
      { err: "Error fetching curriculum" },
      { status: 500 }
    );
  }
}
