import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";

export async function DELETE(req, context) {
  await dbConnect();
  const body = await req.json();
  try {
    const { sectionId, search } = body;
    const curriculum = await Curriculum.findById(search);
    if (!curriculum) {
      return NextResponse.json({ err: "Curriculum not found" });
    }
    const section = curriculum.sections.id(sectionId);
    if (!section) {
      return NextResponse.json({ err: "Section not found" });
    }
    section.lectures = section.lectures.filter((Lecture) => {
      Lecture?._id.toString() !== context?.params?.id.toString();
    });
    await curriculum.save();

    return NextResponse.json(curriculum);
  } catch (error) {
    console.log("error from DELETE----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
