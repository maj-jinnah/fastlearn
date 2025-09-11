// 'use client';

// import { useState } from "react";

import SearchCourse from "./SearchCourse";
import ActiveFilters from "./ActiveFilters";
import CourseCard from "./CourseCard";
import FilterCourse from "./FilterCourse";
import FilterCourseMobile from "./FilterCourseMobile";
import SortCourse from "./SortCourse";

const FilterPage = ({ courses }) => {
    return (
        <>
            {/* header */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center md:justify-between border-gray-200 border-b pb-6 ">
                {/* Search */}
                {/* <SearchCourse /> */}

                <div className="flex items-center justify-center md:justify-end px-3 gap-2 max-lg:w-full">
                    {/* Sort By Price */}
                    <SortCourse />

                    {/* Filter Menus For Mobile */}
                    <FilterCourseMobile />
                </div>
            </div>
            {/* header ends */}

            {/* active filters */}
            <ActiveFilters />

            <section className="pb-24 pt-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    {/* these component can be re use for mobile also */}
                    <FilterCourse />

                    {/* Course grid */}
                    <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {courses.map((course) => {
                            return (
                                <CourseCard key={course?._id} course={course} />
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FilterPage;
