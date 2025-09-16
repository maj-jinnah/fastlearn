'use server';

import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/modules";
import { dbConnection } from "@/service/dbConnection";

export async function createModule(data) {
    try {
        await dbConnection();

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
        await dbConnection();

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
        await dbConnection();

        await Module.findByIdAndUpdate({ _id: moduleId }, data);
    } catch (error) {
        throw new Error(error)
    }
}

export async function changeModulePublishState(moduleId) {
    try {
        await dbConnection();

        const foundModule = await Module.findById(moduleId);
        if (!foundModule) throw new Error("Module not found");

        if (foundModule?.lessonIds) {
            if (foundModule?.lessonIds?.length < 1) {
                throw new Error("Please add at least one lesson");
            }

            await validateModuleLessons(foundModule?.lessonIds)
        }

        const updatedModule = await Module.findByIdAndUpdate(
            moduleId,
            { active: !foundModule?.active },
            { new: true } // return updated doc
        );

        return updatedModule?.active;
    } catch (error) {
        throw new Error(error.message || "Failed to toggle lesson state");
    }
}

export async function deleteModule(moduleId, courseId) {
    try {
        await dbConnection();

        const foundModule = await Module.findById(moduleId);
        if (!foundModule) throw new Error("Module not found");

        if (foundModule.active) {
            throw new Error("You can't delete a published module");
        }

        // Remove module reference from the course
        await Course.findByIdAndUpdate(courseId, {
            $pull: { modules: moduleId },
        });

        // Optionally, you might want to delete all lessons associated with this module
        await Lesson.deleteMany({ _id: { $in: foundModule.lessonIds } });

        // Finally, delete the module
        await Module.findByIdAndDelete(moduleId);

    } catch (error) {
        throw new Error(error.message || "Failed to delete module");
    }
}

async function validateModuleLessons(lessonIds) {
    try {
        await dbConnection();

        // Fetch lessons by IDs
        const lessons = await Lesson.find({ _id: { $in: lessonIds } });

        // Check if any lesson is active
        const hasActiveLesson = lessons.some((l) => l.active);

        if (!hasActiveLesson) {
            throw new Error("To publish or unpublish, you must have at least one published lesson");
        }

        return true;
    } catch (error) {
        throw new Error(error)
    }
}