import { getCourseDetailsById } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const ReviewsPage = async ({params}) => {

  const { courseId } = await params;
  const course =  await getCourseDetailsById( courseId);

  // console.log('course details --- ', course)

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={course?.testimonials} />
    </div>
  );
};

export default ReviewsPage;
