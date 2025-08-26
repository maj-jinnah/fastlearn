import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import CourseCurriculum from "./CourseCurriculum";
import CourseInstructor from "./CourseInstructor";
import CourseOverview from "./CourseOverview";
import Link from "next/link";


const CourseDetails = ({ course }) => {
    // console.log("Course Details: --- ", course);
    // console.log("ins : ", course?.instructor?._id.toString());

    const formattedDate = new Date(course?.modifiedOn).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );

    return (
        <section className="py-8 md:py-12 lg:py-24 lg:w-[1000px] mx-auto">
            <div className="container">
                <span className="bg-emerald-500 px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block">
                    {course?.category?.title}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
                    {course?.title}
                </h3>
                <p className="mt-3 text-gray-600 text-sm">{course?.subtitle}</p>
                {/*  */}
                <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
                    <div className="flex items-center gap-2">
                        <Image
                            width={40}
                            height={40}
                            className="w-[40px] h-[40px] rounded-full"
                            src={course?.instructor?.profilePicture}
                            alt={course?.instructor?.firstName}
                        />
                        <Link
                            href={`/inst-profile/${course?.instructor?._id.toString()}`}
                        >
                            <p className="font-bold">{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</p>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-success font-semibold">
                            Last Updated:{" "}
                        </span>
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {/* Tab */}
                <div className="my-6">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="curriculum">
                                Curriculum
                            </TabsTrigger>
                            <TabsTrigger value="instructor">
                                Instructor
                            </TabsTrigger>
                            {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
                        </TabsList>

                        <TabsContent value="overview">
                            <CourseOverview
                                description={course?.description}
                                learning={course?.learning}
                            />
                        </TabsContent>

                        <TabsContent value="curriculum">
                            <CourseCurriculum course={course} />
                        </TabsContent>

                        <TabsContent value="instructor">
                            <CourseInstructor instructor={course?.instructor} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
