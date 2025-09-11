// "use client";

// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";

// import { Filter } from "lucide-react";
// import { useState } from "react";

// const SORT_OPTIONS = [
//     { label: "Price: Low to High", value: "price-asc" },
//     { label: "Price: High to Low", value: "price-desc" },
// ];

// const CATEGORY_OPTIONS = [
//     {
//         id: 1,
//         label: "Design",
//         value: "design",
//     },
//     {
//         id: 2,
//         label: "Development",
//         value: "development",
//     },
//     {
//         id: 3,
//         label: "IT & Software",
//         value: "it-software",
//     },
//     {
//         id: 4,
//         label: "Business",
//         value: "business",
//     },
// ];

// const FilterCourseMobile = () => {
//     const [filter, setFilter] = useState({
//         categories: ["development"],
//         sort: "",
//     });

//     //   apply checkbox filter
//     const applyArrayFilter = ({ type, value }) => {
//         const isFilterApplied = filter[type].includes(value);

//         if (isFilterApplied) {
//             setFilter((prev) => ({
//                 ...prev,
//                 [type]: prev[type].filter((v) => v !== value),
//             }));
//         } else {
//             setFilter((prev) => ({
//                 ...prev,
//                 [type]: [...prev[type], value],
//             }));
//         }
//     };

//     return (
//         <div className="lg:hidden">
//             <Sheet>
//                 <SheetTrigger>
//                     <Filter className="h-6 w-6" />
//                 </SheetTrigger>
//                 <SheetContent side="left">
//                     <SheetHeader>
//                         <SheetTitle className="text-left">
//                             Filter Courses
//                         </SheetTitle>
//                         <Accordion
//                             defaultValue={["categories"]}
//                             type="multiple"
//                         >
//                             {/* Categories filter */}
//                             <AccordionItem value="categories">
//                                 <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
//                                     <span className="font-medium text-gray-900">
//                                         Categories
//                                     </span>
//                                 </AccordionTrigger>

//                                 <AccordionContent className="pt-6 animate-none">
//                                     <ul className="space-y-4">
//                                         {CATEGORY_OPTIONS.map(
//                                             (option, optionIdx) => (
//                                                 <li
//                                                     key={option.value}
//                                                     className="flex items-center"
//                                                 >
//                                                     <Checkbox
//                                                         type="checkbox"
//                                                         id={`category-${optionIdx}`}
//                                                         onCheckedChange={() => {
//                                                             applyArrayFilter({
//                                                                 type: "categories",
//                                                                 value: option.value,
//                                                             });
//                                                         }}
//                                                         checked={filter.categories.includes(
//                                                             option.value
//                                                         )}
//                                                     />
//                                                     <label
//                                                         htmlFor={`category-${optionIdx}`}
//                                                         className="ml-3 text-sm text-gray-600 cursor-pointer"
//                                                     >
//                                                         {option.label}
//                                                     </label>
//                                                 </li>
//                                             )
//                                         )}
//                                     </ul>
//                                 </AccordionContent>
//                             </AccordionItem>
//                         </Accordion>
//                     </SheetHeader>
//                 </SheetContent>
//             </Sheet>
//         </div>
//     );
// };

// export default FilterCourseMobile;


"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const CATEGORY_OPTIONS = [
  { id: 1, label: "Design", value: "design" },
  { id: 2, label: "Development", value: "development" },
  { id: 3, label: "IT & Software", value: "it-&-software" },
  { id: 4, label: "Business", value: "business" },
];

const FilterCourseMobile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState({
    categories: [],
  });

  // Hydrate from URL on load / reload
  useEffect(() => {
    const category = searchParams.get("category");
    const price = searchParams.get("price");

    setFilter({
      categories: category ? decodeURIComponent(category).split(",") : [],
      sort: price || "",
    });
  }, [searchParams]);

  // Update URL whenever filter state changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter.categories.length > 0) {
      params.set("category", encodeURIComponent(filter.categories.join(",")));
    } else {
      params.delete("category");
    }

    if (filter.sort) {
      params.set("price", filter.sort);
    } else {
      params.delete("price");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filter, pathname, router]);

  // Toggle category checkboxes
  const applyArrayFilter = (value) => {
    setFilter((prev) => {
      const exists = prev.categories.includes(value);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((v) => v !== value)
          : [...prev.categories, value],
      };
    });
  };

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Filter className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Filter Courses</SheetTitle>

            {/* Categories */}
            <Accordion defaultValue={["categories"]} type="multiple">
              <AccordionItem value="categories">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Categories</span>
                </AccordionTrigger>

                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {CATEGORY_OPTIONS.map((option, optionIdx) => (
                      <li key={option.value} className="flex items-center">
                        <Checkbox
                          id={`category-${optionIdx}`}
                          onCheckedChange={() => applyArrayFilter(option.value)}
                          checked={filter.categories.includes(option.value)}
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Sort */}
            <div className="mt-6">
              <Select
                value={filter.sort}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, sort: value }))
                }
              >
                <SelectTrigger className="w-full border !border-b focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterCourseMobile;
