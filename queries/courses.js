import { toPlainObject } from "@/lib/convert-data";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { dbConnection } from "@/service/dbConnection";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
    const courses = await Course.find({ active: true })
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
            select: 'title description status slug course active lessonIds -_id',
            model: Module,
        })
        .populate({
            path: 'testimonials',
            select: 'content user courseId rating -_id',
            model: Testimonial,
        }).lean();

    return toPlainObject(courses);
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
            populate: {
                path: 'lessonIds',
                model: Lesson,
            },
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

    return toPlainObject(course);
}

export async function getCourseDetailsByInstructor(instructorId, expand) {
    const publishedCourses = await Course.find({ instructor: instructorId, active: true }).lean();

    const enrollments = await Promise.all(
        publishedCourses.map(async (course) => {
            const list = await getEnrollmentsForCourse(course._id.toString());
            return list;
        })
    );

    const groupByCourses = Object.groupBy(enrollments.flat(), ({ course }) => course);

    const totalRevenue = publishedCourses.reduce((acc, course) => {
        const quantity = groupByCourses[course?._id]?.length || 0;
        return acc + (quantity * course.price);
    }, 0);

    const total = enrollments.reduce((sum, n) => sum + n.length, 0);

    const testimonials = await Promise.all(
        publishedCourses.map(async (course) => {
            const list = await getTestimonialsForCourse(course._id.toString());
            return list;
        })
    );

    const flattenedTestimonials = testimonials.flat();

    const avgRating = flattenedTestimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / flattenedTestimonials.length;

    if (expand) {
        const allCourses = await Course.find({ instructor: instructorId }).lean();
        return {
            'courses': allCourses,
            'enrollments': enrollments.flat(),
            'totalReviews': flattenedTestimonials,
        }
    }

    return {
        'courses': publishedCourses.length,
        'enrollments': total,
        'totalReviews': flattenedTestimonials.length,
        'averageRating': avgRating.toFixed(1),
        'revenue': totalRevenue,
    };
}

export async function create(courseData) {
    try {
        const course = await Course.create(courseData);
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        throw new Error(error)
    }
}

export async function getCourseDetailsByIdForWatch(id) {
    try {
        const course = await Course.findById(id)
            // .populate({
            //     path: 'category',
            //     model: Category,
            // })
            // .populate({
            //     path: 'instructor',
            //     select: ' -password',
            //     model: User,
            // })
            .populate({
                path: 'modules',
                model: Module,
                match: { active: true },
                populate: {
                    path: 'lessonIds',
                    model: Lesson,
                    match: { active: true },
                },
            })
            // .populate({
            //     path: 'testimonials',
            //     model: Testimonial,
            //     populate: {
            //         path: 'user',
            //         model: User,
            //         select: 'firstName lastName email profilePicture ',
            //     },
            // })
            .lean();

        return toPlainObject(course);
    } catch (error) {
        throw new Error(error)
    }
}

export function courseLessons(courseId) {
    return Course.findById(courseId)
        .select('modules title')
        .populate({
            path: 'modules',
            model: Module,
            select: 'lessonIds title',
            populate: {
                path: 'lessonIds',
                model: Lesson,
                match: { active: true },
            },
        })
        .lean();
}


export async function getCourseListBySearchParams({ categories = [], sort = null }) {
    await dbConnection();

    const query = { active: true };

    // Step 1: Match categories by slug
    if (categories.length > 0) {
        const categoryDocs = await Category.find({
            slug: { $in: categories },
        }).select("_id");

        const categoryIds = categoryDocs.map((cat) => cat._id);

        if (categoryIds.length > 0) {
            query.category = { $in: categoryIds };
        }
    }

    // Step 2: Sorting
    let sortOption = {};
    switch (sort) {
        case "price-asc":
            sortOption.price = 1;
            break;
        case "price-desc":
            sortOption.price = -1;
            break;
        default:
            sortOption.createdOn = -1; // fallback: newest first
    }

    // Step 3: Fetch courses
    const courses = await Course.find(query)
        .populate("category", "title slug") // only fetch category title + slug
        .populate("instructor", "name email") // only fetch needed fields
        .sort(sortOption)
        .lean();

    return toPlainObject(courses);
}
