"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export const EnrollCourse = ({
    asLink,
    courseId,
    courseTitle,
    coursePrice,
    description,
    session,
}) => {

    // console.log('session--', session)
    // console.log('session email ---', session?.user?.email)

    // if (!session) {
    //     return (
    //         <Link
    //             href="/login"
    //             className={cn(
    //                 buttonVariants({
    //                     size: "lg",
    //                 })
    //             )}
    //         >
    //             Enroll
    //             <ArrowRight className="w-3" />
    //         </Link>
    //     );
    // }

    const formAction = async (data) => {
        const { url } = await createCheckoutSession(data);
        window.location.assign(url);
    };

    return (
        <>
            <form action={formAction}>
                <input type="hidden" name="courseId" value={courseId} />
                {asLink ? (
                    <Button
                        type="submit"
                        variant="ghost"
                        className="text-xs text-sky-700 h-7 gap-1"
                    >
                        Enroll
                        <ArrowRight className="w-3" />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        className={cn(buttonVariants({ size: "lg" }))}
                    >
                        Enroll Now
                    </Button>
                )}
            </form>
        </>
    );
};
