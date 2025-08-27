'use client';

import AlertBanner from "@/components/alert-banner";
import { cn } from "@/lib/utils";
import { Circle, CircleCheck } from "lucide-react";
import { AddQuizForm } from "./add-quiz-form";
import QuizCardAction from "./quiz-card-action";
import { TitleForm } from "./title-form";
import { useState } from "react";

const QuizSet = ({ quizzes, quizSetId }) => {

    const [editQuiz, setEditQuiz] = useState(null);

    // console.log("editQuiz --- ", editQuiz);

    return (
        <>
            {/* Quiz List */}
            <div className="max-lg:order-2">
                <h2 className="text-xl mb-6">Quiz List</h2>
                {(quizzes?.quizIds?.length ?? 0) === 0 && (
                    <AlertBanner
                        label="No Quiz are in the set, add some using the form above."
                        variant="warning"
                        className="rounded mb-6"
                    />
                )}
                <div className="space-y-6">
                    {(quizzes?.quizIds ?? []).map((quiz) => {
                        return (
                            <div
                                key={quiz._id}
                                className=" bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border"
                            >
                                <h2 className="mb-3">{quiz?.title}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {quiz?.options.map((option, indx) => {
                                        return (
                                            <div
                                                className={cn(
                                                    "py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600"
                                                )}
                                                key={indx}
                                            >
                                                {option?.is_correct ? (
                                                    <CircleCheck className="size-4 text-emerald-500 " />
                                                ) : (
                                                    <Circle className="size-4" />
                                                )}

                                                <p>{option?.text}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center justify-end gap-2 mt-6">
                                    <QuizCardAction
                                        quiz={quiz}
                                        quizSetId={quizSetId}
                                        setEditQuiz={setEditQuiz}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quiz form  */}
            <div>
                <div className="flex items-center gap-x-2">
                    <h2 className="text-xl">Customize your quiz set</h2>
                </div>
                <div className="max-w-[800px]">
                    <TitleForm
                        initialData={{
                            title: quizzes.title,
                        }}
                        quizSetId={quizSetId}
                    />
                </div>

                <div className="max-w-[800px]">
                    <AddQuizForm quizSetId={quizSetId} initialData={editQuiz} setEditQuiz={setEditQuiz} />
                </div>
            </div>
        </>
    );
};

export default QuizSet;



 {/* 


{
    "_id": "68af61ad65ce33e5a274fd57",
    "title": "test quiz 2",
    "description": "test quiz des ",
    "slug": "test0quiz02",
    "options": [
        {
            "text": "option A",
            "is_correct": true
        },
        {
            "text": "option B",
            "is_correct": false
        },
        {
            "text": "option C",
            "is_correct": false
        },
        {
            "text": "option D",
            "is_correct": false
        }
    ],
    "mark": 5,
    "__v": 0
}


*/}