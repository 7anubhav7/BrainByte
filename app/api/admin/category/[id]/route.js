import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();
  try {
    const { _id, ...updatedBody } = body;

    const updatingCategory = await Category.findByIdAndUpdate(
      context.params.id,
      updatedBody,
      { new: true }
    );
    return NextResponse.json(updatingCategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const deletingCategory = await Category.findByIdAndDelete({
      _id: context.params.id,
    });
    return NextResponse.json(deletingCategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
