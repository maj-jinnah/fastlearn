import { auth } from "@/auth";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import { getUserByEmail, getUserDetails } from "@/queries/user";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

const populateEnrollmentData = async (enrollments) => {
    //console.log(enrollments);

    const populatedEnrollments = await Promise.all(
      enrollments.map(async (enrollment) => {
        // Update Student Information
        const student = await getUserDetails(enrollment?.student?._id);
        enrollment["studentName"] = `${student?.firstName} ${student?.lastName}`;
        enrollment["studentEmail"] = student?.email;

        // Update Quiz and Progress Info
        const filter = {
          course: enrollment?.course?._id,
          student: enrollment?.student?._id,
        };
        const report = await getAReport(filter);

        enrollment["progress"] = 0;
        enrollment["quizMark"] = 0;
        if (report) {

          // Calculate progress
          const course = await getCourseDetails(enrollment?.course?._id);
          const totalModeules = course?.modules?.length;
          const totalCompletedModules = report?.totalCompletedModeules?.length;
          const progress = (totalCompletedModules / totalModeules) * 100;
          enrollment["progress"] = progress;

          // Calculate Quiz Marks
          const quizzes = report?.quizAssessment?.assessments;
          const quizzesTaken = quizzes.filter(q => q.attempted);
          const totalCorrect = quizzesTaken.map(quiz => {
            const item = quiz.options
            return item.filter(o => {
                return o.isCorrect === true && o.isSelected === true
            })
          }).filter(elem => elem.length > 0).flat();
          const marksFromQuizees = totalCorrect.length * 5;
          enrollment["quizMark"] = marksFromQuizees;
        }
        return enrollment;
      })
    );

    return populatedEnrollments;
  };

export async function getInstructorDashboardData() {
    try {
        const session = await auth();
        const instructor = await getUserByEmail(session?.user?.email);
        const data = await getCourseDetailsByInstructor(instructor?._id.toString(), true);

        // console.log( 'dashboard data ---',data)

        return data;
    } catch (error) {
        throw new Error(error)
    }
}