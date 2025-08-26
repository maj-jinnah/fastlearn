import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { getCategories } from "@/queries/categories";
import { getCourseDetailsById } from "@/queries/courses";
import {
    ArrowLeft,
    CircleDollarSign,
    LayoutDashboard,
    ListChecks,
} from "lucide-react";
import Link from "next/link";
import { CategoryForm } from "./_components/category-form";
import { CourseActions } from "./_components/course-action";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { QuizSetForm } from "./_components/quiz-set-form";
import { TitleForm } from "./_components/title-form";
import { getAllQuizSets } from "@/queries/quizzes";

const EditCourse = async ({ params }) => {
    const { courseId } = await params;

    const course = await getCourseDetailsById(courseId);
    const categories = await getCategories();
    const mappedCategories = categories.map((category) => ({
        label: category.title,
        value: category.title,
        id: category._id.toString(),
    }));

    const modules = course?.modules
        .map((module) => ({
            ...module,
            _id: module._id.toString(),
            course: module.course.toString(),
        }))
        .sort((a, b) => a.order - b.order);

        const quizSets = await getAllQuizSets(true);
        const mappedQuizSets = quizSets.map((quizSet) => ({
            label: quizSet.title,
            value: quizSet._id,
            id: quizSet._id,
        }));

        // console.log('course ---', course)

    return (
        <>
            {course?.active === false && (
                <AlertBanner
                    label="This course is unpublished. It will not be visible in the course."
                    variant="warning"
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link
                            href={`/dashboard/courses`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to courses
                        </Link>
                        <div className="flex items-center justify-end">
                            <CourseActions
                                courseId={courseId}
                                isActive={course?.active}
                            />
                        </div>
                    </div>
                    {/* <CourseActions
                        courseId={courseId}
                        isActive={course?.active}
                    /> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">Customize your course</h2>
                        </div>
                        <TitleForm
                            initialData={{
                                title: course?.title,
                            }}
                            courseId={courseId}
                        />
                        <DescriptionForm
                            initialData={{ description: course?.description }}
                            courseId={courseId}
                        />
                        <ImageForm
                            initialData={{ imageUrl: course?.thumbnail }}
                            courseId={courseId}
                        />
                        <CategoryForm
                            initialData={{ value: course?.category?.title }}
                            courseId={courseId}
                            options={mappedCategories}
                        />

                        <QuizSetForm initialData={{quizSetId: course?.quizSet}} courseId={courseId} options={mappedQuizSets} />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2 mb-6">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl">Course Modules</h2>
                            </div>

                            <ModulesForm
                                initialData={modules}
                                courseId={courseId}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={CircleDollarSign} />
                                <h2 className="text-xl">Sell you course</h2>
                            </div>
                            <PriceForm
                                initialData={{ price: course?.price }}
                                courseId={courseId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditCourse;
