import { toPlainObject } from "@/lib/convert-data";
import { QuizSet } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";


export async function getAllQuizSets(filter) {
    try {
        let quizSets = [];
        if (filter) {
            quizSets = await QuizSet.find({ active: true }).lean();
        } else {
            quizSets = await QuizSet.find({}).lean();
        }
        return toPlainObject(quizSets);
    } catch (error) {
        throw new Error(error)
    }
}

export async function getQuizSetById(quizSetId) {
    try {
        const quizSet = await QuizSet.findById(quizSetId)
            .populate({
                path: 'quizIds',
                model: Quiz
            })
            .lean();
        return toPlainObject(quizSet);
    } catch (error) {
        throw new Error(error)
    }
}

export async function createQuiz(data) {
    try {
        const newQuiz = new Quiz(data);
        await newQuiz.save();
        return toPlainObject(newQuiz);
    } catch (error) {
        throw new Error(error)
    }
}