'use server';

import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/lessons";


export async function createLesson(formData){
    try {
        const title = formData.get('title');
        const slug = formData.get('slug');
        const moduleId = formData.get('moduleId');
        const order = formData.get('order');

        const createdLesson = await create({title, slug, moduleId, order});

        const lessonModule = await Module.findById(moduleId);
        lessonModule.lessonIds.push(createdLesson?._id);
        await lessonModule.save();

        return createdLesson;

    } catch (error) {
        throw new Error(error)
    }
}

export async function reOrderLesson(data){
    try {
        await Promise.all(
            data.map(async (item) => {
                const orderedLesson = await Lesson.findById(item.id);
                orderedLesson.order = item.position;
                await orderedLesson.save();
            })
        )
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateLesson(lessonId, data){
    try {
        await Lesson.findByIdAndUpdate({ _id: lessonId }, data);
    } catch (error) {
        throw new Error(error)
    }
}

export async function changeLessonPublishState(LessonId) {
  try {
    const lesson = await Lesson.findById(LessonId);
    if (!lesson) throw new Error("Lesson not found");

    const updatedLesson = await Lesson.findByIdAndUpdate(
      LessonId,
      { active: !lesson?.active },
      { new: true } // return updated doc
    );

    return updatedLesson?.active;
  } catch (error) {
    throw new Error(error.message || "Failed to toggle lesson state");
  }
}

export async function deleteLesson(lessonId, moduleId) {
  try {
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) throw new Error("Lesson not found");

    await Module.findByIdAndUpdate(moduleId, {
      $pull: { lessonIds: lessonId },
    });

  } catch (error) {
    throw new Error(error.message || "Failed to delete lesson");
  }
}
