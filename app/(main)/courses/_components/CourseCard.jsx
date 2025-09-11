import { auth } from "@/auth";
import { CourseProgress } from "@/components/course-progress";
import { EnrollCourse } from "@/components/enroll-course";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { getProgress } from "@/lib/get-progress";
import { cn } from "@/lib/utils";
import { hasEnrollForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/user";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }) => {
    const session = await auth();
    const loggedInUser = await getUserByEmail(session?.user?.email);

    const isEnrolled = await hasEnrollForCourse(
        loggedInUser?._id.toString(),
        course?._id
    );

    const totalChapter = course?.modules.filter((m) => m.active).length;
    const progress = await getProgress(course?._id);

    const amIInstructor = course?.instructor?.email === loggedInUser?.email;

    // console.log("amIInstructor", amIInstructor);
    // console.log('logged in User----', loggedInUser);
    // console.log('course----', course);

    return (
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <Link href={`/courses/${course._id}`}>
                <div className="">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <Image
                            src={course?.thumbnail}
                            alt={"course"}
                            className="object-cover"
                            fill
                            sizes="100%"
                        />
                    </div>
                    <div className="flex flex-col pt-2">
                        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                            {course?.title}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {course?.category?.title}
                        </p>
                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                            <div className="flex items-center gap-x-1 text-slate-500">
                                <div>
                                    <BookOpen className="w-4" />
                                </div>
                                {/* <span>{course?.modules.length} Chapters</span> */}
                                <span>{totalChapter} Chapters</span>
                            </div>
                        </div>

                        <CourseProgress
                            size="sm"
                            value={progress}
                            variant={110 === 100 ? "success" : ""}
                        />
                    </div>
                </div>
            </Link>

            {!amIInstructor && (
                <div className="flex items-center justify-between mt-4">
                    {!isEnrolled && (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {formatPrice(course?.price)}
                        </p>
                    )}

                    {isEnrolled ? (
                        <Link
                            href={`/courses/${course._id.toString()}/lesson`}
                            className={cn(
                                buttonVariants({
                                    size: "sm",
                                })
                            )}
                        >
                            {/* <Button
                            type="submit"
                            variant="ghost"
                            className="text-xs text-sky-700 h-7 gap-1"
                        >
                            Access Course
                            <ArrowRight className="w-3" />
                        </Button> */}
                            Access Course
                            <ArrowRight className="w-3" />
                        </Link>
                    ) : (
                        <EnrollCourse
                            courseId={course._id.toString()}
                            courseTitle={course.title}
                            coursePrice={course.price}
                            description={course.description}
                            asLink={true}
                            session={session}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseCard;
