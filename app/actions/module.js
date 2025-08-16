'use server';

import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/modules";

export async function createModule(data) {
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

export async function reOrderModules(data) {
    try {
        await Promise.all(
            data.map(async (item) => {
                const orderedModule = await Module.findById(item._id);
                orderedModule.order = item.position;
                await orderedModule.save();
            })
        )
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateModule(moduleId, data) {
    try {
        await Module.findByIdAndUpdate({ _id: moduleId }, data);
    } catch (error) {
        throw new Error(error)
    }
}