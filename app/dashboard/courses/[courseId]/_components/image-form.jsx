"use client";

import { useEffect, useState } from "react";

// import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import * as z from "zod";

import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

export const ImageForm = ({ initialData, courseId }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    useEffect(() => {
        if (file) {
            async function uploadImage() {
                try {
                    const formData = new FormData();
                    formData.append("file", file[0]);
                    formData.append("courseId", courseId);
                    const res = await fetch(`/api/upload`, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await res.json();
                    // console.log('image response data --- ', data)
                    if (res.status === 200) {
                        toast.success("Course image updated");
                        toggleEdit();
                        router.refresh();
                        setFile(null);
                    }
                } catch (error) {
                    toast.error(error);
                }
            }

            uploadImage();
        }
    }, [file]);

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Image
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && <>Cancel</>}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an image
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                (!initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                ))}
            {isEditing && (
                <div>
                    <UploadDropzone onUpload={(file) => setFile(file)} />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
};
