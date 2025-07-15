import { getCourseDetailsById } from "@/queries/courses";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";


const SingleCoursePage = async ({ params }) => {

    const { id } = await params;
    const course = await getCourseDetailsById(id);

    // console.log("Course Details: --- ", course);

    return (
        <>
            <CourseDetailsIntro
                title={course?.title}
                thumbnail={course?.thumbnail}
                subtitle={course?.subtitle}
            />

            <CourseDetails course={course} />

            {course?.testimonials && <Testimonials testimonials={course?.testimonials} />}

            <RelatedCourses />
        </>
    );
};
export default SingleCoursePage;
