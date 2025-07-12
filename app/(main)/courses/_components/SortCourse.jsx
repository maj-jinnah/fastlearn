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

const SORT_OPTIONS = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];
const CATEGORY_OPTIONS = [
    {
        id: 1,
        label: "Design",
        value: "design",
    },

    {
        id: 3,
        label: "Development",
        value: "development",
    },
    {
        id: 4,
        label: "Marketing",
        value: "marketing",
    },
    {
        id: 5,
        label: "IT & Software",
        value: "it-software",
    },
    {
        id: 6,
        label: "Personal Development",
        value: "personal-development",
    },
    {
        id: 7,
        label: "Business",
        value: "business",
    },
    {
        id: 8,
        label: "Photography",
        value: "photography",
    },
    {
        id: 9,
        label: "Music",
        value: "music",
    },
];
const PRICE_OPTIONS = [
    { label: "Free", value: "free" },
    { label: "Paid", value: "paid" },
];

const SortCourse = () => {
    return (
        <Select>
            <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0  overflow-hidden">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
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
