import { CourseSidebar } from "./_components/course-sidebar";
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";

const CourseLayout = async ({ children, params }) => {
  const { id } = await params;
    return (
        <div className="">
            <div className="h-[80px] fixed top-[60px] left-0 w-full z-10">
                <div className="flex lg:hidden p-4 border-b h-full items-center bg-white shadow-sm relative">
                    {/* Course Sidebar For Mobile */}
                    <CourseSidebarMobile  />
                    {/* <NavbarRoutes /> */}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="hidden lg:flex h-full w-96 flex-col inset-y-0 z-50">
                    {/* sidebar starts */}
                    <CourseSidebar  />
                    {/* sidebar ends */}
                </div>
                <main className="lg:pl-96 pt-[80px] lg:pt-[20px] h-full col-span-10 px-4">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default CourseLayout;
