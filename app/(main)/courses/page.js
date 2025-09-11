
import { getCourseListBySearchParams } from "@/queries/courses";
import FilterPage from "./_components/FilterPage";


const CoursesPage = async ({ searchParams }) => {

    const { category, price } = await searchParams;

    const categories = category
        ? decodeURIComponent(category).split(",")
        : [];

    const sort = price || null;

    const courses = await getCourseListBySearchParams({ categories, sort });

    return (
        <section
            id="courses"
            className="space-y-6 dark:bg-transparent py-6 xl:w-[1400px] md:w-[1024px] w-[400px]"
        >
            <h2 className="text-xl md:text-2xl font-medium px-2">All Courses</h2>

            <FilterPage courses={courses} />
        </section>
    );
};

export default CoursesPage;
