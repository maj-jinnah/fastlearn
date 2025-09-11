// "use client";

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// const SORT_OPTIONS = [
//     { label: "Price: Low to High", value: "price-asc" },
//     { label: "Price: High to Low", value: "price-desc" },
// ];

// const SortCourse = () => {
//     return (
//         <Select>
//             <SelectTrigger className="w-[300px] border !border-b focus:ring-0 focus:ring-offset-0  overflow-hidden">
//                 <SelectValue placeholder="Sort By" />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup>
//                     <SelectLabel>Fruits</SelectLabel>
//                     {SORT_OPTIONS.map((option) => (
//                         <SelectItem
//                             className="cursor-pointer"
//                             key={option.value}
//                             value={option.value}
//                         >
//                             {option.label}
//                         </SelectItem>
//                     ))}
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     );
// };

// export default SortCourse;


"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const SortCourse = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState("");

  // Load initial value from URL
  useEffect(() => {
    const price = searchParams.get("price");
    if (price) setSort(price);
  }, [searchParams]);

  const handleSortChange = (value) => {
    setSort(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("price", value);
    } else {
      params.delete("price");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={sort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[300px] border !border-b focus:ring-0 focus:ring-offset-0 overflow-hidden">
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
  );
};

export default SortCourse;
