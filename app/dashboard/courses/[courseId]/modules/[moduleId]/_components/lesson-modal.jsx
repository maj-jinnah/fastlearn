import { IconBadge } from "@/components/icon-badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LayoutDashboard, Video } from "lucide-react";
import { LessonActions } from "./lesson-action";
import { LessonDescriptionForm } from "./lesson-description-form";
import { LessonTitleForm } from "./lesson-title-form";
import { VideoUrlForm } from "./video-url-form";
import AlertBanner from "@/components/alert-banner";

export const LessonModal = ({
    open,
    setOpen,
    courseId,
    lesson,
    moduleId,
    onClose,
}) => {
    const postDelete = () => {
        setOpen(false);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent
                className="sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <div>
                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            {/* <Link
                                href={`/dashboard/courses/${courseId}`}
                                className="flex items-center text-sm hover:opacity-75 transition mb-6"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to course setup
                            </Link> */}
                            {lesson?.active === false && (
                                <AlertBanner
                                    label="This lesson is unpublished. It will not be visible in the course."
                                    variant="warning"
                                    className={"mt-5"}
                                />
                            )}
                            <div className="flex items-center justify-end mt-6">
                                <LessonActions
                                    lesson={lesson}
                                    moduleId={moduleId}
                                    onDelete={postDelete}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <IconBadge icon={LayoutDashboard} className="mb-5" />
                                    {/* <h2 className="text-xl">Customize Your chapter</h2> */}
                                    <DialogTitle className="text-xl">
                                        Customize Your chapter
                                    </DialogTitle>
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
                                <DialogTitle className="text-xl">
                                    Add a video
                                </DialogTitle>
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
            </DialogContent>
        </Dialog>
    );
};
