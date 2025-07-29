import { CourseProgress } from "@/components/course-progress";
import { EnrollCourse } from "@/components/enroll-course";
import { formatPrice } from "@/lib/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ course }) => {
    return (
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <Link href={`/courses/${course._id}`}>
                <div className="">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <Image
                            src="/assets/images/courses/course_1.png"
                            alt={"course"}
                            className="object-cover"
                            fill
                        />
                    </div>
                    <div className="flex flex-col pt-2">
                        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                            Reactive Accelerator
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Development
                        </p>
                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                            <div className="flex items-center gap-x-1 text-slate-500">
                                <div>
                                    <BookOpen className="w-4" />
                                </div>
                                <span>4 Chapters</span>
                            </div>
                        </div>

                        <CourseProgress
                            size="sm"
                            value={80}
                            variant={110 === 100 ? "success" : ""}
                        />
                    </div>
                </div>
            </Link>
            <div className="flex items-center justify-between mt-4">
                <p className="text-md md:text-sm font-medium text-slate-700">
                    {formatPrice(course?.price)}
                </p>
                <EnrollCourse
                    // course={{ ...course, _id: course._id.toString() }}
                    courseId={course._id.toString()}
                    courseTitle={course.title}
                    coursePrice={course.price}
                    description={course.description}
                    asLink={true}
                />
            </div>
        </div>
    );
};

export default CourseCard;
