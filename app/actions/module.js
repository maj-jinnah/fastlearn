'use server';

import { Course } from "@/model/course-model";
import { create } from "@/queries/modules";

export async function createModule(data){
    try {
        const title = data.get('title');
        const courseId = data.get('courseId');
        const slug = data.get('slug');
        const order = data.get('order');

        const createdModule = await create({
            title,
            course: courseId,
            slug,
            order,
        });

        const course = await Course.findById(courseId);
        course.modules.push(createdModule._id);
        await course.save();

        return createdModule;
    } catch (error) {
        throw new Error(error)
    }
}
