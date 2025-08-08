import {
    ENROLLMENT_DATA,
    getInstructorDashboardData,
} from "@/lib/dashboard-helper";
import { getCourseDetailsById } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const EnrollmentsPage = async ({ params }) => {
    const { courseId } = await params;
    const course = await getCourseDetailsById(courseId);

    const instructorData = await getInstructorDashboardData(ENROLLMENT_DATA);
    const enrollmentsForCourse = instructorData?.filter(
        (enrollment) => enrollment?.course?._id.toString() === courseId
    );

    return (
        <div className="p-6">
            <h2>{course?.title}</h2>
            <DataTable columns={columns} data={enrollmentsForCourse} />
        </div>
    );
};

export default EnrollmentsPage;
