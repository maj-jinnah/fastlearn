import { Button } from "@/components/ui/button";

const DownloadCertificate = ({ courseId, progress }) => {
    return (
        <>
            <Button className="w-full mt-6" disabled={progress < 100}>
                <>Download Certificate</>
            </Button>
        </>
    );
};

export default DownloadCertificate;
