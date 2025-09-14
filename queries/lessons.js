import { toPlainObject } from "@/lib/convert-data";
import { Lesson } from "@/model/lesson.model";

export async function getLesson(lessonId) {
    try {
        const lesson = await Lesson.findById(lessonId).lean();
        return toPlainObject(lesson);

    } catch (error) {
        throw Error(error)
    }
}

export async function create(lessonData) {
    try {
        const lesson = await Lesson.create(lessonData);
        return JSON.parse(JSON.stringify(lesson));
    } catch (error) {
        throw new Error(error)
    }
}

export async function getLessonBySlug(slug) {
    try {
        const lesson = await Lesson.findOne({ slug }).lean();
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        return toPlainObject(lesson);

    } catch (error) {
        throw new Error(error)
    }
}