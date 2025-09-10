"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { addQuizToQuizSet, updateQuiz } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
    title: z
        .string({
            required_error: "Question is required",
        })
        .min(1, {
            message: "Title is required",
        }),
    description: z
        .string({
            required_error: "Description is required",
        })
        .min(1, {
            message: "Description is required",
        }),
    optionA: z.object({
        label: z
            .string({
                required_error: "Option label is required",
            })
            .min(1, {
                message: "Option label is required",
            }),
        isTrue: z.boolean().default(false),
    }),
    optionB: z.object({
        label: z
            .string({
                required_error: "Option label is required",
            })
            .min(1, {
                message: "Option label is required",
            }),
        isTrue: z.boolean().default(false),
    }),
    optionC: z.object({
        label: z
            .string({
                required_error: "Option label is required",
            })
            .min(1, {
                message: "Option label is required",
            }),
        isTrue: z.boolean().default(false),
    }),
    optionD: z.object({
        label: z
            .string({
                required_error: "Option label is required",
            })
            .min(1, {
                message: "Option label is required",
            }),
        isTrue: z.boolean().default(false),
    }),
});

const mapInitialData = (data) => {
    if (!data) {
        return {
            title: "",
            description: "",
            optionA: { label: "", isTrue: false },
            optionB: { label: "", isTrue: false },
            optionC: { label: "", isTrue: false },
            optionD: { label: "", isTrue: false },
        };
    }

    const optionKeys = ["optionA", "optionB", "optionC", "optionD"];
    const optionsObj = optionKeys.reduce((acc, key, index) => {
        acc[key] = {
            label: data.options?.[index]?.text || "",
            isTrue: data.options?.[index]?.is_correct || false,
        };
        return acc;
    }, {});

    return {
        title: data.title || "",
        description: data.description || "",
        ...optionsObj,
    };
};

export const AddQuizForm = ({ quizSetId, initialData, setEditQuiz }) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: mapInitialData(initialData),
    });

    const { isSubmitting, isValid, errors, isDirty } = form.formState;
    const isEditing = !!initialData?._id;
    const shouldShowActions = isEditing || isDirty;


    function resetForm() {
        form.reset({
            title: "",
            description: "",
            optionA: { label: "", isTrue: false },
            optionB: { label: "", isTrue: false },
            optionC: { label: "", isTrue: false },
            optionD: { label: "", isTrue: false },
        });
    }

    useEffect(() => {
        if (initialData) {
            form.reset(mapInitialData(initialData));
        }
    }, [initialData, form]);

    const onSubmit = async (values) => {

        // console.log("form values --- ", values);

        try {
            const correctness = [
                values.optionA.isTrue,
                values.optionB.isTrue,
                values.optionC.isTrue,
                values.optionD.isTrue,
            ];
            const correctMarked = correctness.filter((val) => val === true);

            if (correctMarked.length < 1) {
                return toast.error(
                    "Please mark at least one option as correct"
                );
            }

            if (initialData?._id) {
                // 📝 Edit existing quiz
                  const response = await updateQuiz(initialData?._id, values);
                toast.success("Quiz updated successfully");
                resetForm();
            } else {
                // ➕ Create new quiz
                const response = await addQuizToQuizSet(quizSetId, values);
                toast.success("Quiz created successfully");
                resetForm();
            }

            router.refresh();
        } catch (error) {
            // console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    const onClose = () => {
        resetForm();
        setEditQuiz(null);
    };

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Add New Quiz
            </div>

            {
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        {/* quiz title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quiz Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Enter quiz question"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* quiz description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quiz Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="Enter quiz description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* --------------- OPTION A -------- */}
                        <div className="space-y-3">
                            <FormLabel>Option A</FormLabel>
                            <div className="flex items-start gap-3">
                                <FormField
                                    control={form.control}
                                    name="optionA.isTrue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex-1">
                                    {/* option label  */}
                                    <FormField
                                        control={form.control}
                                        name="optionA.label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="Enter quiz question"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* --------------- OPTION A ENDS -------- */}

                        {/* --------------- OPTION B -------- */}
                        <div className="space-y-3">
                            <FormLabel>Option B</FormLabel>
                            <div className="flex items-start gap-3">
                                <FormField
                                    control={form.control}
                                    name="optionB.isTrue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex-1">
                                    {/* option label  */}
                                    <FormField
                                        control={form.control}
                                        name="optionB.label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="Enter quiz question"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* --------------- OPTION B ENDS -------- */}

                        {/* --------------- OPTION C -------- */}
                        <div className="space-y-3">
                            <FormLabel>Option C</FormLabel>
                            <div className="flex items-start gap-3">
                                <FormField
                                    control={form.control}
                                    name="optionC.isTrue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex-1">
                                    {/* option label  */}
                                    <FormField
                                        control={form.control}
                                        name="optionC.label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="Enter quiz question"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* --------------- OPTION C ENDS -------- */}

                        {/* --------------- OPTION D -------- */}
                        <div className="space-y-3">
                            <FormLabel>Option D</FormLabel>
                            <div className="flex items-start gap-3">
                                <FormField
                                    control={form.control}
                                    name="optionD.isTrue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex-1">
                                    {/* option label  */}
                                    <FormField
                                        control={form.control}
                                        name="optionD.label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="Enter quiz question"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* --------------- OPTION D ENDS -------- */}

                        {shouldShowActions && (
                            <div className="flex items-center justify-end gap-x-2">
                                <Button
                                    type="button"
                                    onClick={onClose}
                                >
                                    {isEditing ? "Cancel Edit" : "Clear Form"}
                                </Button>
                                <Button disabled={isSubmitting} type="submit">
                                    Save
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            }
        </div>
    );
};
