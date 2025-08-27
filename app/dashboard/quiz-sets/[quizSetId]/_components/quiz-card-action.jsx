"use client";

import { deleteQuiz } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const QuizCardAction = ({ quiz, quizSetId, setEditQuiz }) => {
    const [action, setAction] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            switch (action) {
                case "edit-quiz":
                    setEditQuiz(quiz);
                    break;
                case "delete-quiz":
                    await deleteQuiz(quizSetId, quiz?._id);
                    toast.success("Quiz successfully deleted");
                    router.refresh();
                    break;
                default:
                    throw new Error("Invalid action");
                    break;
            }
        } catch (error) {
            toast.error(
                error.message || "Something went wrong. Please try again."
            );
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setAction("edit-quiz")}
            >
                <Pencil className="w-3 mr-1" /> Edit
            </Button>
            <Button
                size="sm"
                className="text-destructive"
                variant="ghost"
                onClick={() => setAction("delete-quiz")}
            >
                <Trash className="w-3 mr-1" /> Delete
            </Button>
        </form>
    );
};

export default QuizCardAction;
