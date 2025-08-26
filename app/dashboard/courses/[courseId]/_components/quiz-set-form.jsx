// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import { Combobox } from "@/components/ui/combobox";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import { Pencil } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// const formSchema = z.object({
//   quizSetId: z.string().min(1),
// });

// export const QuizSetForm = ({
//   initialData,
//   courseId,
//   options = [
//     {
//       value: "quiz_set_1",
//       label: "Quiz Set 1",
//     },
//     {
//       value: "2",
//       label: "Quiz Set 2",
//     },
//   ],
// }) => {
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       quizSetId: initialData?.quizSetId || "",
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values) => {
//     try {
//       toast.success("Course updated");
//       toggleEdit();
//       router.refresh();
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="mt-6 border bg-gray-50 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Quiz Set
//         <Button variant="ghost" onClick={toggleEdit}>
//           {isEditing ? (
//             <>Cancel</>
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Quiz Set
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <p
//           className={cn(
//             "text-sm mt-2",
//             !initialData.quizSetId && "text-slate-500 italic"
//           )}
//         >
//           {"No quiz set selected"}
//         </p>
//       )}
//       {/* {console.log({ options })} */}
//       {isEditing && (
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4 mt-4"
//           >
//             <FormField
//               control={form.control}
//               name="quizSetId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Combobox options={options} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//               <Button disabled={!isValid || isSubmitting} type="submit">
//                 Save
//               </Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// };

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// new imports for Popover + Command
import { quizSetForCourse } from "@/app/actions/course";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
    quizSetId: z.string().min(1),
});

export const QuizSetForm = ({ initialData, courseId, options }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quizSetId: initialData?.quizSetId || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            await quizSetForCourse(courseId, values.quizSetId);
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    console.log('options ---', options);
    console.log('initialData ---', initialData?.quizSetId);
    const matchedValue = options.map(
        (o) => o.value === initialData?.quizSetId[0]
        // (o) => console.log('options inside find ---',o)
    );

    console.log("matchedValue ---", matchedValue);

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Quiz Set
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Quiz Set
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.quizSetId && "text-slate-500 italic"
                    )}
                >
                    {options.find((o) => o.value === initialData.quizSetId)
                        ?.label || "No quiz set selected"}
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
                            name="quizSetId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className="w-full justify-between"
                                                >
                                                    {field.value
                                                        ? options.find(
                                                              (o) =>
                                                                  o.value ===
                                                                  field.value
                                                          )?.label
                                                        : "Select quiz set"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search quiz set..." />
                                                    <CommandEmpty>
                                                        No quiz set found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {options.map(
                                                            (option) => (
                                                                <CommandItem
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    onSelect={() => {
                                                                        field.onChange(
                                                                            option.value
                                                                        );
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            option.value ===
                                                                                field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {
                                                                        option.label
                                                                    }
                                                                </CommandItem>
                                                            )
                                                        )}
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
