import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";

export async function getCourses() {
    const courses = await Course.find({})
        .populate({
            path: 'category',
            select: 'title description thumbnail -_id',
            model: Category,
        })
        .populate({
            path: 'instructor',
            select: 'firstName email profilePicture -_id',
            model: User,
        })
        .populate({
            path: 'modules',
            select: 'title description status slug course lessonIds -_id',
            model: Module,
        })
        .populate({
            path: 'testimonials',
            select: 'content user courseId rating -_id',
            model: Testimonial,
        });
        
    return courses;
}
