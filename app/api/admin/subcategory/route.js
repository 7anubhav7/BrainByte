import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import SubCategory from "@/models/subcategory";

import slugify from "slugify";

export async function GET() {
  await dbConnect();
  try {
    const subcategory = await SubCategory.find({}).sort({ createdAt: -1 });
    return NextResponse.json(subcategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { name } = body;
  try {
    const subcategory = await SubCategory.create({ name, slug: slugify(name) });
    return NextResponse.json(subcategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
