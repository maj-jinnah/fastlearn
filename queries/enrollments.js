import { toPlainObject } from "@/lib/convert-data";
import { Course } from "@/model/course-model";
import { Enrollment } from "@/model/enrollment-model";
import { Module } from "@/model/module.model";

export async function getEnrollmentsForCourse(courseId) {
    const enrollments = await Enrollment.find({ course: courseId })
        .lean();

    return enrollments;
}

export async function getEnrollmentsForUser(userId) {
    const enrollments = await Enrollment.find({ student: userId })
        .populate({
            path: 'course',
            model: Course,
            populate : {
                path: 'modules',
                model: Module,
                match: { active: true }
            },
        })
        .lean();

    return toPlainObject(enrollments);
}

export async function hasEnrollForCourse(userId, courseId) {

    const enrollment = await Enrollment.findOne({
        student: userId,
        course: courseId,
    });

    if (!enrollment) {
        return false;
    }
    return true;
}

export async function courseEnroll(courseId, userId, paymentMethod) {
    try {
        const enrollment = await Enrollment.create({
            course: courseId,
            student: userId,
            method: paymentMethod,
            enrollment_date: Date.now(),
            status: 'not-started',
        });
        return enrollment;
    } catch (error) {
        // console.error("Error enrolling in course:", error);
        throw new Error("Failed to enroll in course");
    }
}

