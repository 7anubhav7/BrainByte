import { NextResponse } from "next/server"; // Next.js utility to return API responses
import Stripe from "stripe"; // Stripe API for handling payments
import dbConnect from "@/utils/dbConnect"; // Utility function to connect to the MongoDB database
import User from "@/models/user"; // User model to interact with the MongoDB users collection
import { getServerSession } from "next-auth/next"; // NextAuth function to get the session of the current user
import { authOptions } from "@/utils/authOptions";

export async function POST(req, context) {
  await dbConnect();
  const body = await req.json();
  const { billingPeriod, price, title } = body;
  console.log("from POST Route", { billingPeriod, price, title });
}
