import AlertBanner from "@/components/alert-banner";
import { cn } from "@/lib/utils";
import { getQuizSetById } from "@/queries/quizzes";
import { ArrowLeft, Circle, CircleCheck } from "lucide-react";
import Link from "next/link";
import { AddQuizForm } from "./_components/add-quiz-form";
import QuizCardAction from "./_components/quiz-card-action";
import { QuizSetAction } from "./_components/quiz-set-action";
import { TitleForm } from "./_components/title-form";

const EditQuizSet = async ({ params }) => {
    const { quizSetId } = await params;
    const quizzes = await getQuizSetById(quizSetId);

    // console.log("quizSetId --- ", quizSetId);
    // console.log("quiz --- ", quizzes);
    return (
        <>
            {quizzes?.active === false && (
                <AlertBanner
                    label="This course is unpublished. It will not be visible in the course."
                    variant="warning"
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    {/* <div className="w-full"> */}
                    <Link
                        href={`/dashboard/quiz-sets`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to quiz sets
                    </Link>
                    {/* <div className="flex items-center justify-end"> */}
                    <QuizSetAction
                        quizSetId={quizSetId}
                        active={quizzes?.active}
                    />
                    {/* </div> */}
                    {/* </div> */}

                    {/* <QuizSetAction
                        quizSetId={quizSetId}
                        active={quizzes?.active}
                    /> */}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-16">
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
                                            {quiz?.options.map(
                                                (option, indx) => {
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

                                                            <p>
                                                                {option?.text}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className="flex items-center justify-end gap-2 mt-6">
                                            <QuizCardAction
                                                quiz={quiz}
                                                quizSetId={quizSetId}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/*  */}
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
                            <AddQuizForm quizSetId={quizSetId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditQuizSet;
