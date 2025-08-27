import AlertBanner from "@/components/alert-banner";
import { getQuizSetById } from "@/queries/quizzes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import QuizSet from "./_components/quiz-set";
import { QuizSetAction } from "./_components/quiz-set-action";

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
            <div className="p-6 mb-10">
                {/* Quiz action */}
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
                    <QuizSet quizzes={quizzes} quizSetId={quizSetId} />
                </div>
            </div>
        </>
    );
};
export default EditQuizSet;
