"use client";

import { Trash } from "lucide-react";
import { changeCoursePublishState, deleteCourse } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CourseActions = ({ courseId, isActive }) => {
    const [published, setPublished] = useState(isActive);
    const [action, setAction] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            switch (action) {
                case "change-active":
                    const res = await changeCoursePublishState(courseId);
                    setPublished(!published);
                    toast.success("Course has been updated");
                    router.refresh();
                    break;

                case "delete":
                    if (published) {
                        toast.error("You can't delete a published course");
                    } else {
                        await deleteCourse(courseId);
                        toast.success("Course, modules, and lessons deleted successfully");
                        // router.refresh();
                        router.push(`/dashboard/courses`);
                    }
                    break;

                default:
                    throw new Error("Invalid Course action");
                    break;
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setAction("change-active");
                    }}
                >
                    {published ? "Unpublish" : "Publish"}
                </Button>

                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                        setAction("delete");
                    }}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
