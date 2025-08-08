import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

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
                select: 'firstName lastName email profilePicture ',
            },
        })
        .lean();

    return course;
}

export async function getCourseDetailsByInstructor(instructorId, expand) {
    const courses = await Course.find({ instructor: instructorId }).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const list = await getEnrollmentsForCourse(course._id.toString());
            return list;
        })
    );

    const groupByCourses = Object.groupBy(enrollments.flat(), ({ course }) => course);

    const totalRevenue = courses.reduce((acc, course) => {
        return acc + (groupByCourses[course?._id].length * course.price);
    }, 0);

    const total = enrollments.reduce((sum, n) => sum + n.length, 0);

    const testimonials = await Promise.all(
        courses.map(async (course) => {
            const list = await getTestimonialsForCourse(course._id.toString());
            return list;
        })
    );

    const flattenedTestimonials = testimonials.flat();

    const avgRating = flattenedTestimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / flattenedTestimonials.length;

    if(expand){
        return {
            'courses': courses,
            'enrollments': enrollments.flat(),
            'totalReviews': flattenedTestimonials,
        }
    }

    return {
        'courses': courses.length,
        'enrollments': total,
        'totalReviews': flattenedTestimonials.length,
        'averageRating': avgRating.toFixed(1),
        'revenue': totalRevenue,
    };
}