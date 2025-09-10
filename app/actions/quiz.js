'use server';

import { getSlug, toPlainObject } from "@/lib/convert-data";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Assessment } from "@/model/assessment-model";
import { Course } from "@/model/course-model";
import { QuizSet } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { createQuiz, getQuizSetById } from "@/queries/quizzes";
import { createAssessmentReport } from "@/queries/reports";
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
            explanations: quizData.explanations,
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

            return { success: true, message: "QuizSet and related quizzes deleted successfully" }
        });

    } catch (error) {
        throw new Error(`Transaction failed: ${error.message}` || 'Failed to delete quiz set');
    } finally {
        await session.endSession();
    }
}

export async function deleteQuiz(quizSetId, quizId) {
    const session = await mongoose.startSession();

    try {
        return await session.withTransaction(async () => {
            // Step 1: Verify quiz exists and get details
            const quiz = await Quiz.findById(quizId).session(session);
            if (!quiz) {
                throw new Error("Quiz not found");
            }

            // Step 2: Verify quizSet exists and contains this quiz (in one operation)
            const quizSet = await QuizSet.findOne({
                _id: quizSetId,
                quizIds: quizId
            }).session(session);

            if (!quizSet) {
                throw new Error("QuizSet not found or quiz doesn't belong to this QuizSet");
            }

            // Step 3: Delete quiz and remove from quizSet simultaneously
            await Promise.all([
                Quiz.findByIdAndDelete(quizId, { session }),
                QuizSet.findByIdAndUpdate(
                    quizSetId,
                    { $pull: { quizIds: quizId } },
                    { session }
                )
            ]);

            return {
                success: true,
                message: "Quiz deleted successfully",
            };
        });

    } catch (error) {
        // console.error('Delete quiz transaction failed:', error);
        throw new Error(error.message || 'Failed to delete quiz');
    } finally {
        await session.endSession();
    }
}

export async function updateQuiz(quizId, data) {
    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const transformQuizData = {
            title: data.title,
            explanations: data.explanations,
            slug: getSlug(data.title),
            options: ["A", "B", "C", "D"].map((letter) => ({
                text: data[`option${letter}`].label,
                is_correct: data[`option${letter}`].isTrue,
            })),
        };

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            quizId,
            transformQuizData,
            { new: true }
        );
        if (!updatedQuiz) {
            throw new Error('Quiz not found');
        }
        return toPlainObject(updatedQuiz);
    } catch (error) {
        throw new Error(error.message || "Failed to update quiz");
    }
}

export async function addQuizAssessment(courseId, quizSetId, answers) {
    try {
        const quizSet = await getQuizSetById(quizSetId);
        const quizzes = quizSet.quizIds;
        const assessmentRecord = quizzes.map((quiz, index) => {
            const obj = {};
            obj['quizId'] = quiz?._id;

            const found = answers.find(ans => ans.quizId === quiz?._id);
            if (found) {
                obj['attempted'] = true;
            } else {
                obj['attempted'] = false;
            }

            const mergedOptions = quiz?.options.map((option) => {
                return {
                    option: option?.text,
                    isCorrect: option?.is_correct,
                    isSelect: (function () {
                        const found = answers.find(ans => ans?.option?.label === option?.text);
                        if (found) {
                            return true;
                        } else {
                            return false;
                        }
                    })()
                }
            })
            obj['options'] = mergedOptions;
            return obj;
        })

        const assessmentEntry = {};
        assessmentEntry.assessments = assessmentRecord;
        assessmentEntry.otherMarks = 0;

        const assessment = await Assessment.create(assessmentEntry)
        const loggedInUser = await getLoggedInUser();

        await createAssessmentReport({
            courseId: courseId,
            userId: loggedInUser?._id,
            assessmentId: assessment?._id
        })

    } catch (error) {
        throw new Error(error.message || "Failed to add quiz assessment");
    }
}