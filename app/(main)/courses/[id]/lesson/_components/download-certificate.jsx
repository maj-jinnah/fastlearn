"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const DownloadCertificate = ({ courseId, progress }) => {
    const [isCertificateDownloading, setIsCertificateDownloading] =
        useState(false);

    const handleDownloadCertificate = async () => {
        try {
            setIsCertificateDownloading(true);

            const response = await fetch(
                `/api/certificate?courseId=${courseId}`
            );
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "certificate.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Certificate downloaded successfully");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsCertificateDownloading(false);
        }
    };

    return (
        <>
            <Button
                onClick={handleDownloadCertificate}
                className="w-full mt-6"
                disabled={progress < 100}
            >
                <>Download Certificate</>
            </Button>
        </>
    );
};

export default DownloadCertificate;
