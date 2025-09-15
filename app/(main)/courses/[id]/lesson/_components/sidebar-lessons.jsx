import { AccordionContent } from "@/components/ui/accordion";
import SidebarLessonItems from "./sidebar-lesson-items";

const SidebarLessons = ({ lessons, module, courseId, firstLesson }) => {
    const sortedLessons = lessons.toSorted((a, b) => a.order - b.order);
    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
                {sortedLessons.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No lessons available
                    </p>
                )}
                {sortedLessons.map((lesson) => (
                    <SidebarLessonItems
                        key={lesson?._id}
                        lesson={lesson}
                        module={module}
                        courseId={courseId}
                        firstOne={firstLesson?.slug === lesson?.slug? true : false}
                    />
                ))}
                {/* <SidebarLessonItems /> */}
            </div>
        </AccordionContent>
    );
};

export default SidebarLessons;
