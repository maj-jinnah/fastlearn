import { courseLessons } from "@/queries/courses";
import { getAReport } from "@/queries/reports";
import { getLoggedInUser } from "./loggedin-user";

export async function getProgress(courseId) {
    const loggedInUser = await getLoggedInUser();
    const report = await getAReport({
        course: courseId,
        student: loggedInUser?._id.toString(),
    });

    const courseForProgress = await courseLessons(courseId);
    const totalCourseLessons = courseForProgress?.modules.reduce(
        (acc, module) => acc + module?.lessonIds.length,
        0
    ) || 0;
    const completedCourseLessons = report?.totalCompletedLessons.length;

    const progress = (completedCourseLessons / totalCourseLessons) * 100 || 0;

    return progress;
}