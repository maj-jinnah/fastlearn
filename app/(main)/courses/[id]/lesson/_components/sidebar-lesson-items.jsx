"use client";

import { cn } from "@/lib/utils";
// import { getFirstLesson } from "@/queries/lessons";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SidebarLessonItems = ({ lesson, module, courseId, firstOne }) => {
    const searchParams = useSearchParams();
    const activeLessonSlug = searchParams.get("name");

    const isPrivate = (lesson) => {
        return lesson?.access === "private";
    };

    const isCompleted = (lesson) => {
        return lesson?.state === "completed";
    };

    let active = "";
    if (!active && activeLessonSlug === lesson?.slug) {
        active =
            "border border-green-500 p-1 rounded-md bg-green-50 text-black";
    }
    if (firstOne && !activeLessonSlug) {
        active =
            "border border-green-500 p-1 rounded-md bg-green-50 text-black";
    }

    return (
        <>
            <Link
                href={
                    isPrivate(lesson)
                        ? `#`
                        : `/courses/${courseId}/lesson?name=${lesson?.slug}&module=${module}`
                }
                className={cn(
                    `flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ${active} `,
                    isPrivate(lesson)
                        ? "text-slate-700  hover:text-slate-700"
                        : isCompleted(lesson) &&
                              "text-emerald-700 hover:text-emerald-700"
                )}
            >
                <div className="flex items-center gap-x-2">
                    {isPrivate(lesson) ? (
                        <Lock size={16} className={cn("text-slate-700")} />
                    ) : isCompleted(lesson) ? (
                        <CheckCircle
                            size={16}
                            className={cn("text-emerald-700")}
                        />
                    ) : (
                        <PlayCircle
                            size={16}
                            className={cn("text-slate-700")}
                        />
                    )}
                    {lesson?.title}
                </div>
            </Link>
        </>
    );
};

export default SidebarLessonItems;
