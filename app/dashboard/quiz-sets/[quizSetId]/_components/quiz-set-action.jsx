"use client";

import { Trash } from "lucide-react";

import { changeQuizSetPublishState } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const QuizSetAction = ({ quizSetId, active }) => {
    const [action, setAction] = useState(null);
    const [published, setPublished] = useState(active);
    const router = useRouter();

    const handleAction = async (e) => {
        e.preventDefault();

        try {
            switch (action) {
                case "change-active":
                    await changeQuizSetPublishState(quizSetId);
                    setPublished(!published);
                    toast.success("Quiz Set has been updated");
                    router.refresh();
                    break;

                case "delete":
                    // if (published) {
                    //     toast.error("You can't delete a published quiz set");
                    // } else {
                    //    await deleteQuizSet(quizSetId);
                    //     toast.success("Quiz Set successfully deleted");
                    //     router.refresh();
                    // }
                    break;

                default:
                    throw new Error("Invalid Quiz Set action");
                    break;
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };
    return (
        <form onSubmit={handleAction}>
            <div className="flex items-center gap-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAction("change-active")}
                >
                    {published ? "Unpublish" : "Publish"}
                </Button>

                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setAction("delete")}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
