import { Lesson } from "@/model/lesson.model";


export async function getLesson(lessonId) {
    const lesson = await Lesson.findById(lessonId).lean();

    return lesson;
}

export async function create(lessonData) {
    try {
        const lesson = await Lesson.create(lessonData);
        return JSON.parse(JSON.stringify(lesson));
    } catch (error) {
        throw new Error(error)
    }
}