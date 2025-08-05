import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/user";
import { redirect } from "next/navigation";
import EnrollCourseCard from "../../component/enroll-course-card";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import Link from "next/link";

async function EnrolledCourses() {
    const session = await auth();
    if (!session?.user?.email) {
        redirect("/login");
    }

    const loggedInUser = await getUserByEmail(session?.user?.email);
    const courses = await getEnrollmentsForUser(loggedInUser._id.toString());
    
    return (
        <>
            {courses.length === 0 ? (
                <div className="h-[50vh] w-full flex items-center justify-center text-center text-gray-500">
                    <p>No enrolled courses found. Explore our <Link className="underline font-bold" href="/courses">courses</Link> and start learning today!</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                    {courses.map((course) => (
                        <EnrollCourseCard
                            key={course?._id}
							enrolledCourse={course}
							loggedInUser={loggedInUser}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default EnrolledCourses;
