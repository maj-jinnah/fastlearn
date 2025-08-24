"use client";

import { Trash } from "lucide-react";

import { changeLessonPublishState, deleteLesson } from "@/app/actions/lesson";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
    const [published, setPublished] = useState(lesson?.active);
    const [action, setAction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(action);

        try {
            switch (action) {
                case "change-active":
                    const res = await changeLessonPublishState(lesson?._id);
                    setPublished(!published);
                    toast.success("Lesson has been updated");
                    break;
                case "delete":
                    if (published) {
                        toast.error("You can't delete a published lesson");
                    } else {
                        await deleteLesson(lesson?._id, moduleId);
                        toast.success("Lesson successfully deleted");
                        onDelete();
                    }
                    break;
                default:
                    throw new Error("Invalid Lesson action");
                    break;
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAction("change-active")}
                >
                    {published ? "Unpublish" : "Publish"}
                </Button>

                <Button size="sm" onClick={() => setAction("delete")}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
