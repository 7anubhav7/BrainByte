import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";

import Razorpay from "razorpay";

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_CLIENT_SECRET,
});

export async function GET(req, context) {
  await dbConnect();

  try {
    const course = await CurriculumCourse.findOne({
      slug: context?.params?.id,
    });

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: "course_receipt",
      notes: {
        course_id: course?._id,
      },
    };

    const order = await razorpay.orders.create(options);
    console.log("Order from Razorpay", order);
    return NextResponse.json(order);
  } catch (error) {
    console.log("Error from razorpay GET route----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
