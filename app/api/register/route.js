import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();

  const { name, email, password, organization } = body;

  console.log({ name, email, password, organization });
}
