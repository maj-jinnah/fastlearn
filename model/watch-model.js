import mongoose, { Schema } from "mongoose";

const watchSchema = new Schema({
    state: {
        required: true,
        type: String,
        default: "started",
    },
    lesson: { type: Schema.ObjectId, ref: "Lesson" },
    user: { type: Schema.ObjectId, ref: "User" },
    module: { type: Schema.ObjectId, ref: "Module" },
    lastTime: {
        required: true,
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const Watch = mongoose.models.Watch ?? mongoose.model("Watch", watchSchema);