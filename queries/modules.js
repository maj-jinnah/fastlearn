import { toPlainObject } from "@/lib/convert-data";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { dbConnection } from "@/service/dbConnection";

export async function create(data) {
    try {
        await dbConnection();

        const response = await Module.create(data);
        return JSON.parse(JSON.stringify(response));
    } catch (error) {
        throw new Error(error)
    }
}

export async function getModuleById(moduleId) {
    try {
        await dbConnection();

        const response = await Module.findById(moduleId)
            .populate({
                path: 'lessonIds',
                model: Lesson,
            })
            .lean();
        return { ...response, _id: response._id.toString() };
    } catch (error) {
        throw new Error(error)
    }
}

export async function getModuleBySlug(slug) {
    try {
        await dbConnection();

        const response = await Module.findOne({ slug })
            .lean();

        return toPlainObject(response);
    } catch (error) {
        throw new Error(error)
    }
}