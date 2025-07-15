import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";
import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "@/utils/authOptions";
import CourseOrder from "@/models/courseorder";
import UserCourse from "@/models/usercourse";
import Razorpay from "razorpay";

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_CLIENT_SECRET,
});

export async function POST(req, context) {
  await dbConnect();

  const body = await req.json();
  const { razorpay_payment_id } = body;
  const session = await getServerSession(authOptions);

  try {
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    console.log("payment razor---", payment);

    const value = payment.amount / 100;
    const courseId = payment.notes.course_id;
    const course = await CurriculumCourse.findOne({ _id: courseId });
    if (payment && payment.status === "captured") {
      const orders = await CourseOrder.create({
        user_id: session?.user?._id,
        course_name: course?.title,
        transaction_id: courseId,
        order_id: uuidv4(),
        payment_provider: `${payment?.method || "razorpay"}`,
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
        { failed: "Payment failed, try again!" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: "Payment success!" }, { status: 500 });
  } catch (error) {
    console.log("Error from POST of razor verify----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
