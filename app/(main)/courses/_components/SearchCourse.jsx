import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchCourse = () => {
    return (
        <div className="relative flex items-center justify-center md:justify-start h-10 px-3 max-lg:w-full">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
            <Input
                type="text"
                placeholder="Search courses..."
                className="pl-8 pr-3 py-2 text-sm w-[340px]" // Add additional styling as needed
            />
        </div>
    );
};

export default SearchCourse;
