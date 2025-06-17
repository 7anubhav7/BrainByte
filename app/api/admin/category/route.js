import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import slugify from "slugify";
// Define the GET function to retrieve data from the Category collection
export async function GET() {
  await dbConnect(); // Establish a database connection before querying

  try {
    // Query the Category collection to get all documents, sorted by the 'createdAt' field in descending order (newest first)
    const category = await Category.find({}).sort({ createdAt: -1 });

    // Return the retrieved data as a JSON response
    return NextResponse.json(category);
  } catch (err) {
    // If an error occurs during the query or any other step, return a 500 Internal Server Error response with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST() {
  await dbConnect();
  const body = await req.json();

  const { name } = body;
  try {
    const category = await Category.create({ name, slug: slugify(name) });
    return NextResponse.json(Category);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
