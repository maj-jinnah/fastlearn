import { toPlainObject } from "@/lib/convert-data";
import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";

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



export const getFirstLesson = async (courseId) => {
  try {
  const course = await Course.findById(courseId)
  .select("modules")
  .populate({
    path: "modules",
    model: Module,
    select: "lessonIds order title",
    match: { active: true },
    populate: {
      path: "lessonIds",
      model: Lesson,
      select: "_id order title slug",
      match: { active: true },
    },
  })
  .lean();

  return toPlainObject(course);

  } catch (error) {
    throw Error(error)
  }
};

// export const getFirstLesson = async (courseId) => {
//   const startTime = Date.now();

//   try {
//     const course = await Course.findById(courseId)
//       .select("modules")
//       .populate({
//         path: "modules",
//         model: Module,
//         select: "lessonIds order title",
//         match: { active: true },
//         populate: {
//           path: "lessonIds",
//           model: Lesson,
//           select: "_id order title slug",
//           match: { active: true },
//         },
//       })
//       .lean();

//     const endTime = Date.now();
//     const executionTime = endTime - startTime;

//     console.log(`Query executed in: ${executionTime}ms`);

//     return toPlainObject(course);
//   } catch (error) {
//     const endTime = Date.now();
//     console.log(`Query failed after: ${endTime - startTime}ms`);
//     throw new Error(error);
//   }
// };


// export const getFirstLesson = async (courseId) => {
//     const startTime = performance.now();

//     try {

//         // ... your query
//         const firstModule = await Module.findOne({
//             courseId,
//             active: true
//         })
//             .sort({ order: 1 })
//             .select('lessonIds')
//             .lean();

//         if (!firstModule) return null;

//         const firstLesson = await Lesson.findOne({
//             _id: { $in: firstModule.lessonIds },
//             active: true
//         })
//             .sort({ order: 1 })
//             .select('_id order title slug')
//             .lean();



//         const endTime = performance.now();
//         console.log(`Query executed in: ${(endTime - startTime).toFixed(2)}ms`);

//         console.log('firstLesson', firstLesson)
//         return toPlainObject(firstLesson);
//     } catch (error) {
//         const endTime = performance.now();
//         console.log(`Query failed after: ${(endTime - startTime).toFixed(2)}ms`);
//         throw new Error(error);
//     }
// };
