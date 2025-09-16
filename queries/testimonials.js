import { toPlainObject } from "@/lib/convert-data";
import { Testimonial } from "@/model/testimonial-model";
import { dbConnection } from "@/service/dbConnection";


export async function getTestimonialsForCourse(courseId) {
    try {
        await dbConnection();

        const testimonials = await Testimonial.find({ courseId: courseId }).lean();
        return toPlainObject(testimonials);

    } catch (error) {
        throw new Error(error);
    }
}


export async function getTestimonialsForUser({ user, courseId }) {
    try {
        await dbConnection();

        const testimonials = await Testimonial.find({ user, courseId }).lean();
        return toPlainObject(testimonials);

    } catch (error) {
        throw new Error(error);
    }
}