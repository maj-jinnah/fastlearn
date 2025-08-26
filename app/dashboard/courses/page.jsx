import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { toPlainObject } from "@/lib/convert-data";

const CoursesPage = async () => {
    const rawData = await getInstructorDashboardData();
    const data = toPlainObject(rawData);
    // console.log("instructor dashboard data", data);
    // console.log("courses", data?.courses);
    return (
        <div className="p-6">
           <DataTable columns={columns} data={data?.courses} />
        </div>
    );
};

export default CoursesPage;
