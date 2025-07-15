import { Enrollment } from "@/model/enrollment-model";

export async function getEnrollmentsForCourse(courseId) {
    const enrollments = await Enrollment.find({ course: courseId })
        .lean();

    return enrollments;
}