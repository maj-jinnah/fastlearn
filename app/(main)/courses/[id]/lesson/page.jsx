import { Separator } from "@/components/ui/separator";
// import { VideoPlayer } from "@/components/video-player";
import { getCourseDetailsById } from "@/queries/courses";
import { getLessonBySlug } from "@/queries/lessons";
import LessonVideoPlayer from "./_components/lesson-video-player";
import VideoDescription from "./_components/video-description";

const Course = async ({ params, searchParams }) => {
    const { id } = await params;
    const { name, module } = await searchParams;

    const course = await getCourseDetailsById(id);
    const allModules = course?.modules.toSorted((a, b) => a.order - b.order);

    const defaultLesson = allModules[0]?.lessonIds.toSorted(
        (a, b) => a.order - b.order
    )[0];

    const lessonToPlay = name ? await getLessonBySlug(name) : defaultLesson;
    const defaultModule = module ?? allModules[0].slug;

    return (
        <div>
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4 w-full">
                    {/* <VideoPlayer courseId={id} lesson={lessonToPlay} 
					module={defaultModule} /> */}
                    <LessonVideoPlayer
                        courseId={id}
                        lesson={lessonToPlay}
                        module={defaultModule}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {lessonToPlay?.title}
                        </h2>
                    </div>
                    <Separator />
                    <VideoDescription description={lessonToPlay?.description} />
                </div>
            </div>
        </div>
    );
};
export default Course;
