import { CourseProgress } from "@/components/course-progress";
import { getProgress } from "@/lib/get-progress";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { getCourseDetailsByIdForWatch } from "@/queries/courses";
import { getQuizSetById } from "@/queries/quizzes";
import { getAReport } from "@/queries/reports";
import DownloadCertificate from "./download-certificate";
import GiveReview from "./give-review";
import Quiz from "./quiz";
import SidebarModules from "./sidebar-modules";

export const CourseSidebar = async ({ courseId }) => {
    const course = await getCourseDetailsByIdForWatch(courseId);
    const loggedInUser = await getLoggedInUser();

    const updatedModules = await Promise.all(
        course?.modules.map(async (module) => {
            const moduleId = module?._id;
            const lessonIds = module?.lessonIds;

            const updatedLessons = await Promise.all(
                lessonIds.map(async (lesson) => {
                    const lessonId = lesson?._id;

                    const watch = await Watch.findOne({
                        lesson: lessonId,
                        user: loggedInUser?._id,
                        module: moduleId,
                    }).lean();
                    if (watch?.state === "completed") {
                        lesson.state = "completed";
                    }
                    return lesson;
                })
            );
            return module;
        })
    );

    const progress = await getProgress(courseId);

    const report = await getAReport({
        course: courseId,
        student: loggedInUser?._id.toString(),
    });

    const quizSet = course?.quizSet;
    const isQuizComplete = report?.quizAssessment ? true : false;

    const allQuizzes = await getQuizSetById(quizSet);

    // console.log("isQuizComplete", isQuizComplete);
    // console.log("quizSet", quizSet);
    // console.log("report", report);
    // console.log('course', course)
    // console.log("allQuizzes", allQuizzes);

    return (
        <>
            <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
                <div className="p-8 flex flex-col border-b">
                    <h1 className="font-semibold">Reactive Accelerator</h1>
                    <div className="mt-10">
                        <CourseProgress variant="success" value={progress} />
                    </div>
                </div>
                <SidebarModules modules={updatedModules} courseId={courseId} />

                <div className="w-full px-6 border-t mt-3">
                    {quizSet && (
                        <Quiz
                            courseId={courseId}
                            quizzes={allQuizzes}
                            quizSetId={quizSet}
                            isQuizComplete={isQuizComplete}
                        />
                    )}
                </div>

                <div className="w-full px-6 pb-8">
                    <DownloadCertificate
                        courseId={courseId}
                        progress={progress}
                    />
                    <GiveReview courseId={courseId} />
                </div>
            </div>
        </>
    );
};
