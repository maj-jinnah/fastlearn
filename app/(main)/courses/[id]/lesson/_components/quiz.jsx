"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuizModal from "./quiz-modal";

const Quiz = ({ courseId, quizzes, isQuizComplete, quizSetId }) => {
    const [open, setOpen] = useState(false);

    const allQuizzes = quizzes?.quizIds?.map((quiz) => {
        return {
            id: quiz?._id,
            title: quiz?.title,
            description: quiz?.description,
            options: quiz?.options.map((option, indx) => {
                return {
                    id: indx,
                    label: option?.text,
                    isCorrect: option?.is_correct,
                };
            }),
        };
    });

    return (
        <>
            <div className="bg-white border border-border rounded-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden mt-3 shadow-md">
                <div className="flex h-24 items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 px-6 text-center">
                    <span className="text-lg font-semibold text-white">
                        {quizzes?.title}
                    </span>
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between gap-6 text-sm mb-2 font-medium text-gray-700">
                        <span>Total Mark</span>
                        <Badge className="bg-success/20 text-primary hover:bg-success/20">
                            {quizzes?.quizIds
                                ? quizzes?.quizIds?.length * 5
                                : 0}
                        </Badge>
                    </div>
                    {/* <p className="mb-4 font-normal text-gray-500 dark:text-gray-400 text-sm">
                        Reactive Accelerator: Quiz Set of Module 4 Lesson 16:
                        Lesson 16
                    </p> */}
                    <Button
                        className="flex gap-2 capitalize border-sky-500 text-sky-500 hover:text-sky-500 hover:bg-sky-500/5 w-full"
                        variant="outline"
                        onClick={() => setOpen(true)}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-6.49-5.84c.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c1.23 0 2.08.56 2.51 1.26.37.6.58 1.73.01 2.57-.63.93-1.23 1.21-1.56 1.81-.13.24-.18.4-.18 1.18h-1.52c.01-.41-.06-1.08.26-1.66zm-.56 3.79c0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04 0 .58-.44 1.05-1.04 1.05-.58 0-1.05-.47-1.05-1.05z"></path>
                        </svg>
                        <span>
                            {isQuizComplete
                                ? "Want to Participated again"
                                : "Participate in a Quiz"}
                        </span>
                    </Button>
                </div>
            </div>
            <QuizModal
                courseId={courseId}
                quizSetId={quizSetId}
                quizzes={allQuizzes}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};

export default Quiz;
