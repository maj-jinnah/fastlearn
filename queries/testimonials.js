import { toPlainObject } from "@/lib/convert-data";
import { Testimonial } from "@/model/testimonial-model";


export async function getTestimonialsForCourse(courseId) {
    const testimonials = await Testimonial.find({ courseId: courseId }).lean();

    return testimonials;
}


export async function getTestimonialsForUser({ user, courseId }) {
    try {
        const testimonials = await Testimonial.find({ user, courseId }).lean();
        return toPlainObject(testimonials);
        
    } catch (error) {
        throw error;
    }
}