import { Enrollment } from "@/model/enrollment-model";

export async function getEnrollmentsForCourse(courseId) {
    const enrollments = await Enrollment.find({ course: courseId })
        .lean();

    return enrollments;
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
        console.error("Error enrolling in course:", error);
        throw new Error("Failed to enroll in course");
    }
}