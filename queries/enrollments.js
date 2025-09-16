import { toPlainObject } from "@/lib/convert-data";
import { Course } from "@/model/course-model";
import { Enrollment } from "@/model/enrollment-model";
import { Module } from "@/model/module.model";
import { dbConnection } from "@/service/dbConnection";

export async function getEnrollmentsForCourse(courseId) {
    try {
        await dbConnection();

        const enrollments = await Enrollment.find({ course: courseId })
            .lean();
        return toPlainObject(enrollments);
    } catch (error) {
        throw new Error(error);
    }
}

export async function getEnrollmentsForUser(userId) {
    try {
        await dbConnection();

        const enrollments = await Enrollment.find({ student: userId })
            .populate({
                path: 'course',
                model: Course,
                populate: {
                    path: 'modules',
                    model: Module,
                    match: { active: true }
                },
            })
            .lean();

        return toPlainObject(enrollments);
    } catch (error) {
        throw new Error(error);
    }
}

export async function hasEnrollForCourse(userId, courseId) {
    try {
        await dbConnection();

        const enrollment = await Enrollment.findOne({
            student: userId,
            course: courseId,
        });

        if (!enrollment) {
            return false;
        }
        return true;

    } catch (error) {
        throw new Error(error);
    }
}

export async function courseEnroll(courseId, userId, paymentMethod) {
    try {
        await dbConnection();
        const enrollment = await Enrollment.create({
            course: courseId,
            student: userId,
            method: paymentMethod,
            enrollment_date: Date.now(),
            status: 'not-started',
        });
        return toPlainObject(enrollment);
    } catch (error) {
        // console.error("Error enrolling in course:", error);
        throw new Error("Failed to enroll in course");
    }
}

