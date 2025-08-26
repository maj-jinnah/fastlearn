'use server';

import { toPlainObject } from "@/lib/convert-data";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/courses";
import mongoose from "mongoose";

export async function createCourse(data) {
    try {
        const loggedInUser = await getLoggedInUser();
        data['instructor'] = loggedInUser?._id;
        const course = await create(data);
        return course;
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateCourse(courseId, dataToUpdate) {
    try {
        // console.log('data to update', dataToUpdate)
        await Course.findByIdAndUpdate({ _id: courseId }, dataToUpdate);
    } catch (error) {
        throw new Error(error);
    }
}

export async function changeCoursePublishState(courseId) {
    try {
        const foundCourse = await Course.findById(courseId);
        if (!foundCourse) throw new Error("Course not found");

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { active: !foundCourse.active },
            { new: true }
        );
        return updatedCourse.active;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteCourse(courseId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 1. Find the course
        const course = await Course.findById(courseId).session(session);
        if (!course) throw new Error("Course not found");

        // 2. Get all module IDs from course.modules
        const moduleIds = course.modules || [];

        // 3. Find all modules
        const modules = await Module.find({ _id: { $in: moduleIds } }).session(session);

        // 4. Delete lessons inside each module
        for (const mod of modules) {
            if (mod.lessonIds?.length > 0) {
                await Lesson.deleteMany({ _id: { $in: mod.lessonIds } }).session(session);
            }
        }

        // 5. Delete all modules
        await Module.deleteMany({ _id: { $in: moduleIds } }).session(session);

        // 6. Delete the course itself
        await Course.findByIdAndDelete(courseId).session(session);

        // ✅ Commit everything (finalize changes)
        await session.commitTransaction();
        session.endSession();

        return { success: true, message: "Course, modules, and lessons deleted successfully" };
    } catch (error) {
        // ❌ If anything goes wrong, rollback
        await session.abortTransaction();
        session.endSession();
        throw new Error(error.message || "Failed to delete course");
    }
}

// export async function quizSetForCourse(courseId, quizSetId) {
//     try {
//         const result = await Course.findByIdAndUpdate(
//             courseId,
//             { 
//                 $addToSet: { quizSet: quizSetId } // Adds only if not already present
//             },
//             { 
//                 new: true, // Return updated document
//                 runValidators: true 
//             }
//         );

//         if (!result) throw new Error("Course not found");

//         return toPlainObject(result);
//     } catch (error) {
//         throw new Error(`Failed to add quizSet to course: ${error.message}`);
//     }
// }

export async function quizSetForCourse(courseId, quizSetId) {
    try {
        const result = await Course.findByIdAndUpdate(
            courseId,
            { 
                quizSet: quizSetId // Direct replacement
            },
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!result) throw new Error("Course not found");

        return { success: true, message: "QuizSet updated successfully" };
    } catch (error) {
        throw new Error(`Failed to update quizSet for course: ${error.message}`);
    }
}