"use client";

import { Trash } from "lucide-react";

import { changeModulePublishState, deleteModule } from "@/app/actions/module";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ModuleActions = ({ module, courseId }) => {
    const [published, setPublished] = useState(module?.active);
    const [action, setAction] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            switch (action) {
                case "change-active":
                    const res = await changeModulePublishState(module?._id);
                    console.log('response ---', res);
                    setPublished(!published);
                    toast.success("Module has been updated");
                    router.refresh();
                    break;

                case "delete":
                    if (published) {
                        toast.error("You can't delete a published module");
                    } else {
                        await deleteModule(module?._id, courseId);
                        toast.success("Module successfully deleted");
                        // router.refresh();
                        router.push(`/dashboard/courses/${courseId}`);
                    }
                    break;

                default:
                    throw new Error("Invalid Module action");
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
