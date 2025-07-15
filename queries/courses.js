import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";

export async function getCourseList() {
    const courses = await Course.find({})
        .select('title description thumbnail price active category instructor modules testimonials')
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
        }).lean();

    return courses;
}

export async function getCourseDetailsById(id) {
    const course = await Course.findById(id)
        .populate({
            path: 'category',
            model: Category,
        })
        .populate({
            path: 'instructor',
            select: ' -password',
            model: User,
        })
        .populate({
            path: 'modules',
            model: Module,
        })
        .populate({
            path: 'testimonials',
            model: Testimonial,
            populate: {
                path: 'user',
                model: User,
                select: 'first_name last_name email profile_picture ',
            },
        })
        .lean();

    return course;
}
