'use server';

import { getSlug, toPlainObject } from "@/lib/convert-data";
import { Course } from "@/model/course-model";
import { QuizSet } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { createQuiz } from "@/queries/quizzes";
import mongoose from "mongoose";

export async function updateQuizSet(quizSetId, data) {
    try {
        // Find the quiz set by ID and update it with the new data
        const updatedQuizSet = await QuizSet.findByIdAndUpdate(quizSetId, data, { new: true });
        if (!updatedQuizSet) {
            throw new Error('Quiz set not found');
        }
        return toPlainObject(updatedQuizSet);
    } catch (error) {
        throw new Error(error);
    }
}

export async function addQuizToQuizSet(quizSetId, quizData) {
    try {
        const transformQuizData = {
            title: quizData.title,
            description: quizData.description,
            slug: getSlug(quizData.title),
            options: ["A", "B", "C", "D"].map((letter) => ({
                text: quizData[`option${letter}`].label,
                is_correct: quizData[`option${letter}`].isTrue,
            })),
        };

        const quiz = await createQuiz(transformQuizData);

        // Find the quiz set by ID
        const quizSet = await QuizSet.findById(quizSetId);
        if (!quizSet) {
            throw new Error('Quiz set not found');
        }

        // Add the new quiz to the quiz set's quizzes array
        quizSet.quizIds.push(quiz?._id);

        // Save the updated quiz set
        await quizSet.save();

        return toPlainObject(quizSet);
    } catch (error) {
        throw new Error(error);
    }
}

export async function createQuizSet(data) {
    try {
        data['slug'] = getSlug(data?.title);
        // console.log('data', data)
        const newQuizSet = new QuizSet(data);
        await newQuizSet.save();
        return toPlainObject(newQuizSet);
    } catch (error) {
        throw new Error(error);
    }
}

export async function changeQuizSetPublishState(quizSetId) {
    try {
        // Find the quiz set by ID
        const quizSet = await QuizSet.findById(quizSetId);
        if (!quizSet) {
            throw new Error('Quiz set not found');
        }

        // Toggle the isPublished field
        const changedQuizSet = await QuizSet.findByIdAndUpdate(
            quizSetId,
            { active: !quizSet.active },
            { new: true }
        );

        return toPlainObject(changedQuizSet);
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteQuizSet(quizSetId) {
    const session = await mongoose.startSession();
    
    try {
        return await session.withTransaction(async () => {
            // Step 1: Find the quizSet
            const quizSet = await QuizSet.findById(quizSetId).session(session);
            if (!quizSet) {
                throw new Error("QuizSet not found");
            }

            // Step 2: Delete all related quizzes
            if (quizSet.quizIds && quizSet.quizIds.length > 0) {
                // const quizDeleteResult =  call deleteMany method
                await Quiz.deleteMany(
                    { _id: { $in: quizSet.quizIds } },
                    { session }
                );
                // deletedQuizzesCount = quizDeleteResult.deletedCount;
                // console.log('deleted quizzes count:', quizDeleteResult);
            }

            // Step 3: Remove quizSet reference from courses
            const courseUpdateResult = await Course.updateMany(
                { quizSet: quizSetId },
                { $unset: { quizSet: "" } },
                { session }
            );

            // Step 4: Delete the quizSet
            await QuizSet.findByIdAndDelete(quizSetId, { session });

            // return {
            //     success: true,
            //     message: "QuizSet deleted successfully with transaction",
            //     deletedQuizzes: deletedQuizzesCount,
            //     updatedCourses: courseUpdateResult.modifiedCount
            // };

            return { success: true, message: "QuizSet and related quizzes deleted successfully"}
        });

    } catch (error) {
        throw new Error(`Transaction failed: ${error.message}`  || 'Failed to delete quiz set');
    } finally {
        await session.endSession();
    }
}