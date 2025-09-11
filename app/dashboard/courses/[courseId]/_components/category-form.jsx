"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updateCourse } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    value: z.string().min(1),
});

export const CategoryForm = ({ initialData, courseId, options }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);

    const toggleEdit = () => {
        setIsEditing((current) => !current);
        setOpen(false);
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: initialData?.value || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            const selectedCategory = options.find(
                (opt) => opt.value === values.value
            );
            // console.log(selectedCategory?.id)
            await updateCourse(courseId, { category: selectedCategory?.id });
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong");
        }
    };

    const selectedOption = options.find(
        (opt) => opt.value === form.getValues("value")
    );

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Category
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData?.value && "text-slate-500 italic"
                    )}
                >
                    {options.find((o) => o.value === initialData?.value)
                        ?.label || "No category"}
                </p>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Popover
                                            open={open}
                                            onOpenChange={setOpen}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between"
                                                >
                                                    {selectedOption?.label ||
                                                        "Select category"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search category..." />
                                                    <CommandEmpty>
                                                        No category found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {options.map((opt) => (
                                                            <CommandItem
                                                                key={opt.value}
                                                                value={
                                                                    opt.value
                                                                }
                                                                onSelect={(
                                                                    val
                                                                ) => {
                                                                    field.onChange(
                                                                        val
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                }}
                                                                className="pointer-events-auto"
                                                            >
                                                                {opt.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
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
