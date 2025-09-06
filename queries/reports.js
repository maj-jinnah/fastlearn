import { Assessment } from "@/model/assessment-model";
import { Module } from "@/model/module.model";
import { Report } from "@/model/report-model";
import { getCourseDetailsById } from "./courses";


export async function getAReport(filter) {
    try {
        const report = await Report.findOne(filter)
            .populate({
                path: 'quizAssessment',
                model: Assessment,
            })
            .lean();

        return report
    } catch (error) {
        throw new Error(error)
    }
}

export async function createWatchReport({ userId, courseId, moduleId, lessonId }) {
    try {
        let report = await Report.findOne({
            student: userId,
            course: courseId
        });

        if (!report) {
            report = await Report.create({
                student: userId,
                course: courseId
            });
        }

        const foundedLesson = report?.totalCompletedLessons.find((lesson) => lesson.toString() === lessonId);
        if (!foundedLesson) {
            report?.totalCompletedLessons.push(lessonId);
        }

        const foundModule = await Module.findById(moduleId);
        const lessonToCheck = foundModule?.lessonIds;
        const completedLessonIds = report?.totalCompletedLessons;

        const isModuleCompleted = lessonToCheck.every((lesson) => completedLessonIds.includes(lesson.toString()));

        if (isModuleCompleted) {
            const foundedModule = report?.totalCompletedModules.find((module) => module.toString() === moduleId);

            if (!foundedModule) {
                report?.totalCompletedModules.push(moduleId);
            }
        }

        const course = await getCourseDetailsById(courseId);

        const modulesInCourse = course?.modules;
        const moduleCount = modulesInCourse?.length ?? 0;

        const completedModule = report.totalCompletedModules;
        const completedModuleCount = completedModule?.length ?? 0;

        // console.log(moduleCount, completedModuleCount);

        if (completedModuleCount >= 1 && completedModuleCount === moduleCount) {
            // console.log("Course completed");
            report.completion_date = Date.now();
        }

        await report.save();

    } catch (error) {
        throw new Error(error)
    }
}