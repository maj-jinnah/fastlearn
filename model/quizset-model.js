import mongoose, { Schema } from "mongoose";

const quizSetSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
    },
    quizIds: [{ type: Schema.ObjectId, ref: "Quiz" }],
    active: {
        required: true,
        type: Boolean,
        default: false,
    },
})

export const QuizSet = mongoose.models.QuizSet ?? mongoose.model("QuizSet", quizSetSchema);