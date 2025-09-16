import { toPlainObject } from "@/lib/convert-data";
import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson.model";
import { dbConnection } from "@/service/dbConnection";
import mongoose from "mongoose";

export async function getLesson(lessonId) {
  try {
    await dbConnection();

    const lesson = await Lesson.findById(lessonId).lean();
    return toPlainObject(lesson);

  } catch (error) {
    throw Error(error)
  }
}

export async function create(lessonData) {
  try {
    await dbConnection();

    const lesson = await Lesson.create(lessonData);
    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    throw new Error(error)
  }
}

export async function getLessonBySlug(slug) {
  try {
    await dbConnection();

    const lesson = await Lesson.findOne({ slug }).lean();
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    return toPlainObject(lesson);

  } catch (error) {
    throw new Error(error)
  }
}

export const getFirstLesson = async (courseId) => {
  try {
    await dbConnection();

    const result = await Course.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
      {
        $lookup: {
          from: 'modules',
          localField: 'modules',
          foreignField: '_id',
          as: 'modules',
          pipeline: [
            { $match: { active: true } },
            { $sort: { order: 1 } },
            { $limit: 1 }, // Get only the first module
            {
              $lookup: {
                from: 'lessons',
                localField: 'lessonIds',
                foreignField: '_id',
                as: 'lessons',
                pipeline: [
                  { $match: { active: true } },
                  { $sort: { order: 1 } },
                  { $limit: 1 }, // Get only the first lesson
                  { $project: { _id: 1, order: 1, title: 1, slug: 1 } }
                ]
              }
            }
          ]
        }
      },
      {
        $project: {
          'modules.lessons': 1,
          'modules.title': 1,
          'modules.order': 1
        }
      }
    ]);

    const lesson = result[0]?.modules[0]?.lessons[0] || null;
    return toPlainObject(lesson);

  } catch (error) {
    throw new Error(error);
  }
};