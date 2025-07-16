import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { v4 as uuidv4 } from "uuid";

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY);

import CurriculumCourse from "@/models/CurriculumCourse";
import CourseOrder from "@/models/courseorder";
import UserCourse from "@/models/usercourse";

export async function GET(req, context) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  console.log("session id being passed---", context?.params?.id);
  try {
    const stripesession = await stripeInstance.checkout.sessions.retrieve(
      context.params.id
    );
    console.log("Stripe session------", stripesession);
    const value = stripesession.amount_total
      ? stripesession.amount_total / 100
      : 0;
    const course_id = stripesession?.metadata?.course_id;
    const course = await CurriculumCourse.findOne({
      _id: course_id,
    });
    if (stripesession && stripesession?.payment_status === "paid") {
      const orders = await CourseOrder.create({
        user_id: session?.user?._id,
        course_name: course?.title,
        transaction_id: course_id,
        order_id: uuidv4(),
        payment_provider: "stripe",
        amount: value,
        payment_status: "paid",
      });
      const usercourse = await UserCourse.create({
        user_id: session?.user?._id,
        course_id: course?._id,
      });
      console.log("Order----", orders);
      console.log("User course----", usercourse);
    } else {
      return NextResponse.json(
        { err: "Payment not successful" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: "Payment Success" }, { status: 200 });
  } catch (error) {
    console.log("payment error*****", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
