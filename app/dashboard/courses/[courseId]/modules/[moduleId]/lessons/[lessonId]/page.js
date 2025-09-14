import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { getLesson } from "@/queries/lessons";
import { ArrowLeft, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { LessonActions } from "../../_components/lesson-action";
import { LessonDescriptionForm } from "../../_components/lesson-description-form";
import { LessonTitleForm } from "../../_components/lesson-title-form";
import { VideoUrlForm } from "../../_components/video-url-form";


const LessonPage = async ({ params }) => {
    const { courseId, moduleId, lessonId } = await params;

    const lesson = await getLesson(lessonId);

    // console.log('lesson---', lesson)

    // console.log('params id get', courseId, moduleId, lessonId)
    return (
        <>
            {lesson?.active === false && (
                <AlertBanner
                    label="This lesson is unpublished. It will not be visible in the course."
                    variant="warning"
                    className={""}
                />
            )}
            <div className='p-6 md:p-8'>
                <div className="flex items-center justify-between">
                    <Link
                        href={`/dashboard/courses/${courseId}/modules/${moduleId}`}
                        className="flex items-center text-sm hover:opacity-75 transition"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to module setup
                    </Link>

                    <div className="flex items-center justify-end">
                        <LessonActions
                            courseId={courseId}
                            lesson={lesson}
                            moduleId={moduleId}
                        // onDelete={postDelete}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LayoutDashboard} className="mb-5" />
                                {/* <h2 className="text-xl">Customize Your chapter</h2> */}
                                <h2 className="text-xl">
                                    Customize Your chapter
                                </h2>
                            </div>
                            <LessonTitleForm
                                initialData={{ title: lesson?.title }}
                                courseId={courseId}
                                lessonId={lesson?._id}
                            />
                            <LessonDescriptionForm
                                initialData={{
                                    description: lesson?.description,
                                }}
                                courseId={courseId}
                                lessonId={lesson?._id}
                            />
                        </div>
                        {/* <div>
                                <div className="flex items-center gap-x-2">
                                    <IconBadge icon={Eye} />
                                    <DialogTitle className="text-xl">
                                        Access Settings
                                    </DialogTitle>
                                </div>
                                <LessonAccessForm
                                    initialData={{
                                        isFree: lesson?.access !== "private",
                                    }}
                                    courseId={courseId}
                                    lessonId={lesson?._id}
                                />
                            </div> */}
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Video} />
                            <h2 className="text-xl">
                                Add a video
                            </h2>
                        </div>
                        <VideoUrlForm
                            initialData={{
                                url: lesson?.video_url,
                                duration: lesson?.duration,
                            }}
                            courseId={courseId}
                            lessonId={lesson?._id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LessonPage;