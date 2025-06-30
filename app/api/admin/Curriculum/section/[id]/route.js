import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";

export async function DELETE(req, context) {
  await dbConnect();
  const body = await req.json();
  console.log("Search passed into DELETE------", body);
  console.log("Section id sent to DELETE-------", context?.params?.id);
  try {
    const curriculum = await Curriculum.findById(body);
    if (!curriculum) {
      return NextResponse.json({ err: "Error-Not found" });
    }
    curriculum.sections = curriculum.sections.filter(
      (section) => section?._id.toString() !== context?.params?.id.toString()
    );

    await curriculum.save();
    console.log("Section deletion success");
    return NextResponse.json(curriculum);
  } catch (error) {
    console.log("Error from DELETE Route-----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
