"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updateLesson } from "@/app/actions/lesson";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { secondsToTime, timeToSeconds } from "@/lib/time-to-seconds";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { VideoPlayer } from "@/components/video-player";

const formSchema = z.object({
    url: z.string().min(1, {
        message: "Required",
    }),
    duration: z.string().min(1, {
        message: "Required",
    }),
});

export const VideoUrlForm = ({ initialData, courseId, lessonId }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({
        url: initialData?.url,
        duration: secondsToTime(initialData?.duration),
    });

    // console.log('initialData', initialData);
    // console.log('data', data);
    // console.log('time', data?.duration);

    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            const payload = {};
            const duration = timeToSeconds(values?.duration);
            payload["video_url"] = values?.url;
            payload["duration"] = duration;

            if(!payload?.video_url || payload?.duration === 0) throw Error('Video URL and Duration is Required');
            await updateLesson(lessonId, payload);

            toast.success("Add video updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            // console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Video URL
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit URL
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    <p className="text-sm mt-2">{data?.url}</p>
                    <div className="mt-6">
                        <VideoPlayer url={data?.url} />
                    </div>
                </>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        {/* url */}
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to the course'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* duration */}
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video Duration</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. '10:30:18'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
