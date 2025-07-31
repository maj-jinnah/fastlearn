import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/resendEmail";
import { stripe } from "@/lib/stripe";
import { getCourseDetailsById } from "@/queries/courses";
import { courseEnroll } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/user";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams }) => {
    const { session_id, courseId } = await searchParams;
    if (!session_id) {
        throw new Error("Session ID is required for successful enrollment.");
    }

    const userSession = await auth();
    if (!userSession?.user?.email) {
        redirect("/login");
    }

    const course = await getCourseDetailsById(courseId);
    const loggedInUser = await getUserByEmail(userSession?.user?.email);

    const checkoutSession = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["line_items", "payment_intent"],
        }
    );

    const paymentIntent = checkoutSession?.payment_intent;
    const paymentStatus = paymentIntent?.status;

    const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
    const customerEmail = loggedInUser?.email;
    const courseName = course?.title;

    if (paymentStatus === "succeeded") {
        const enrolled = await courseEnroll(
            courseId,
            loggedInUser?._id,
            "stripe" || paymentIntent?.payment_method_types[0]
        );

        const emailsToSend = [
            {
                to: customerEmail,
                subject: `Enrollment Successful for ${courseName}`,
                courseName: courseName,
                customerName: customerName,
                message: `Hi ${loggedInUser?.firstName},\n\nCongratulations! You have successfully enrolled in the course "${courseName}".\n\nIf you have any questions, feel free to reach out to our support team. We're here to help!\n\nBest regards,\nThe FastLearn Team`,
            },
            {
                to: course?.instructor?.email,
                subject: `New Enrollment for ${courseName}`,
                courseName: courseName,
                customerName: `${course?.instructor?.firstName} ${course?.instructor?.lastName}`,
                message: `Hi ${course?.instructor?.firstName},\n\nYou have a new student enrolled in your course "${courseName}".\n\nStudent Name: ${customerName}\nStudent Email: ${customerEmail}\n\nIf you have any questions, feel free to reach out to our support team. We're here to help!\n\nBest regards,\nThe FastLearn Team`,
            }
        ]

        const emailSendResponse = await sendEmails(emailsToSend);
        console.log("Email send response:", emailSendResponse);
        
    }

    return (
        <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
                {paymentStatus === "succeeded" && (
                    <>
                        <CircleCheck className="w-32 h-32 bg-emerald-400 rounded-full p-0 text-white" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl">
                            Congratulations, {customerName}! Your Enrollment was
                            Successful for {courseName}
                        </h1>
                    </>
                )}
                <div className="flex items-center gap-3">
                    <Button asChild size="sm">
                        <Link href="/courses">Browse Courses</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/think-in-a-redux-way/introduction">
                            Play Course
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Success;
