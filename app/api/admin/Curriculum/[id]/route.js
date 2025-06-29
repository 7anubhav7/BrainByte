import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Curriculum from "@/models/Curriculum";
import slugify from "slugify";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();
  console.log("Body being sent to PUT------", body);
  try {
    const slug = slugify(body.title);
    body.slug = slug;
    const curriculum = await Curriculum.findByIdAndUpdate(
      context.params.id,
      body,
      { new: true }
    );
    return NextResponse.json(curriculum);
  } catch (error) {
    console.log("Error from PUT-----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();
  try {
    const curriculum = await Curriculum.findByIdAndDelete({
      _id: context.params.id,
    });
    return NextResponse.json(curriculum);
  } catch (error) {
    console.log("DELETE route error object----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
