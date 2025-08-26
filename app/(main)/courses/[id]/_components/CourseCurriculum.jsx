import { Accordion } from "@/components/ui/accordion";
import { BookCheck, Clock10 } from "lucide-react";
import CourseModuleList from "./CourseModuleList";
import { secondsToHourMinute } from "@/lib/time-to-seconds";

const CourseCurriculum = ({ course }) => {
    const totalDurationSeconds =
        course?.modules
            ?.map((module) =>
                module.lessonIds?.reduce(
                    (total, lesson) => total + (lesson.duration || 0),
                    0
                )
            )
            .reduce((sum, moduleDuration) => sum + moduleDuration, 0) || 0;

    // console.log("Total Duration Seconds: ", totalDurationSeconds);
    // console.log("Course Curriculum: ", course);

    const totalTime = secondsToHourMinute(totalDurationSeconds);

    return (
        <>
            {/* each tab content can be independent component */}
            <div className="w-full flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                    <BookCheck className="w-4 h-4" />
                    {course?.modules?.length} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock10 className="w-4 h-4" />
                    {totalTime}
                </span>
                {/* <span className="flex items-center gap-1.5">
                    <Radio className="w-4 h-4" />4 Live Class
                </span> */}
            </div>

            {/* contents */}
            <Accordion
                defaultValue={["item-1", "item-2", "item-3"]}
                type="multiple"
                // collapsible
                collapsible="true"
                className="w-full"
            >
                {course?.modules &&
                    course?.modules.map((module, index) => (
                        <CourseModuleList key={index} module={module} />
                    ))}
            </Accordion>
        </>
    );
};

export default CourseCurriculum;
