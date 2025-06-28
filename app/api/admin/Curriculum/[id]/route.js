import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Curriculum from "@/models/Curriculum";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();
  try {
    const curriculum = await Curriculum.findByIdAndUpdate(
      context.params.id,
      body,
      { new: true }
    );
    return NextResponse.json(curriculum);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const curriculum = await Curriculum.findByIdAndDelete(context.params.id);
    return NextResponse.json(curriculum);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
