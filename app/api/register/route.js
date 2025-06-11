import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const { name, email, password, organization } = body;

  console.log({ name, email, password, organization });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { err: "Email already in use" },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
      organization,
    }).save();

    return NextResponse.json({ msg: "User registered successfully" });
  } catch (error) {
    console.log("error==========", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
