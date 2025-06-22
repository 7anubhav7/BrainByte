import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import SubCategory from "@/models/subcategory";

export async function PUT(req, context) {
  await dbConnect();
  const body = await req.json();

  try {
    const { ...updateBody } = body;
    const updatingCategory = await SubCategory.findByIdAndUpdate(
      context.params.id,
      updateBody,
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
    const deletingSubCategory = await SubCategory.findByIdAndDelete({
      _id: context.params.id,
    });
    return NextResponse.json(deletingSubCategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
