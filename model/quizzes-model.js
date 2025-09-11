import mongoose, { Schema } from "mongoose";

const quizzesSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        type: String,
    },
    explanations: {
        type: String,
    },
    slug: {
        required: true,
        type: String,
    },
    options: {
        type: Array,
    },
    mark: {
        required: true,
        default: 5,
        type: Number,
    },
});


export const Quiz = mongoose.models.Quiz ?? mongoose.model("Quiz", quizzesSchema);