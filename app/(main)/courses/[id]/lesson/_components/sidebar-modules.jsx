"use client";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams } from "next/navigation";
import SidebarLessons from "./sidebar-lessons";

const SidebarModules = ({ modules, courseId, firstLesson }) => {
    const searchParams = useSearchParams();
    const allModules = modules.toSorted((a, b) => a.order - b.order);

    const query = searchParams.get("name");

    const selectedModule = allModules.find((module) => {
        return module.lessonIds.find((lesson) => {
            return lesson.slug === query;
        });
    });

    const expandedModuleId = selectedModule?._id ?? allModules[0]?._id;
    return (
        <>
            <Accordion
                defaultValue={expandedModuleId}
                type="single"
                collapsible
                className="w-full px-6"
            >
                {allModules.map((module) => (
                    <AccordionItem
                        className="border-0"
                        value={module?._id}
                        key={module?._id}
                    >
                        <AccordionTrigger>{module?.title}</AccordionTrigger>
                        <SidebarLessons
                            courseId={courseId}
                            lessons={module?.lessonIds}
                            module={module?.slug}
                            firstLesson={firstLesson}
                        />
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default SidebarModules;
