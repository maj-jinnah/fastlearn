// "use client";

// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useState, useEffect } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

// const FilterCourse = () => {
//     const [filter, setFilter] = useState({
//         categories: []
//     })

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

//     // useEffect(() => {
//     //     const category = params.get("category");
//     //     if (category) {
//     //         const categories = decodeURI(category).split(",");
//     //         setQuery(categories);
//     //     }
//     // }, []);

//     // useEffect(() => {
//     //     if (query.length > 0) {
//     //         params.set("category", encodeURI(query.join(",")));
//     //     } else {
//     //         params.delete("category");
//     //     }
//     //     replace(`${pathName}?${params.toString()}`, { scroll: false });
//     // }, [query]);

//     console.log('filter', filter)

//     return (
//         <div className="hidden lg:block">
//             <Accordion defaultValue={["categories"]} type="multiple">
//                 {/* Categories filter */}
//                 <AccordionItem value="categories">
//                     <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
//                         <span className="font-medium text-gray-900">
//                             Categories
//                         </span>
//                     </AccordionTrigger>

//                     <AccordionContent className="pt-6 animate-none">
//                         <ul className="space-y-4">
//                             {CATEGORY_OPTIONS.map((option, optionIdx) => (
//                                 <li
//                                     key={option.value}
//                                     className="flex items-center"
//                                 >
//                                     <Checkbox
//                                         type="checkbox"
//                                         id={`category-${optionIdx}`}
//                                         onCheckedChange={() => {
//                                             applyArrayFilter({
//                                                 type: "categories",
//                                                 value: option.value,
//                                             });
//                                         }}
//                                         checked={filter.categories.includes(
//                                             option.value
//                                         )}
//                                     />
//                                     <label
//                                         htmlFor={`category-${optionIdx}`}
//                                         className="ml-3 text-sm text-gray-600 cursor-pointer"
//                                     >
//                                         {option.label}
//                                     </label>
//                                 </li>
//                             ))}
//                         </ul>
//                     </AccordionContent>
//                 </AccordionItem>

//                 {/* Price filter */}
//                 {/* <AccordionItem value="price">
//                     <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
//                         <span className="font-medium text-gray-900">Price</span>
//                     </AccordionTrigger>

//                     <AccordionContent className="pt-6 animate-none">
//                         <ul className="space-y-4">
//                             {PRICE_OPTIONS.map((option, optionIdx) => (
//                                 <li
//                                     key={option.value}
//                                     className="flex items-center"
//                                 >
//                                     <Checkbox
//                                         type="checkbox"
//                                         id={`price-${optionIdx}`}
//                                         onCheckedChange={() => {
//                                             applyArrayFilter({
//                                                 type: "price",
//                                                 value: option.value,
//                                             });
//                                         }}
//                                         checked={filter.price.includes(
//                                             option.value
//                                         )}
//                                     />
//                                     <label
//                                         htmlFor={`price-${optionIdx}`}
//                                         className="ml-3 text-sm text-gray-600 cursor-pointer"
//                                     >
//                                         {option.label}
//                                     </label>
//                                 </li>
//                             ))}
//                         </ul>
//                     </AccordionContent>
//                 </AccordionItem> */}

//             </Accordion>
//         </div>
//     );
// };

// export default FilterCourse;



"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CATEGORY_OPTIONS = [
  { id: 1, label: "Design", value: "design" },
  { id: 2, label: "Development", value: "development" },
  { id: 3, label: "IT & Software", value: "it-&-software" },
  { id: 4, label: "Business", value: "business" },
];

const FilterCourse = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState({ categories: [] });

  // Load initial filter state from URL
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const categories = decodeURIComponent(category).split(",");
      setFilter({ categories });
    }
  }, [searchParams]);

  // Update URL when filter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter.categories.length > 0) {
      params.set("category", encodeURIComponent(filter.categories.join(",")));
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filter, pathname, router]);

  // Toggle category
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
    <div className="hidden lg:block">
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
    </div>
  );
};

export default FilterCourse;
