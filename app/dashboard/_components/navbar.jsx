"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MobileSidebar } from "./mobile-sidebar";
import { signOut } from "next-auth/react";

export const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await fetch("/api/me");
                const data = await response.json();
                setLoggedInUser(data);
            } catch (error) {
                toast.error(error.message || "Failed to fetch user data");
            }
        };
        fetchMe();
    }, []);

    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar />
            <div className="flex items-center justify-end  w-full md:pr-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Avatar>
                                <AvatarImage
                                    src={
                                        loggedInUser?.profilePicture ||
                                        "https://github.com/shadcn.png"
                                    }
                                    alt={loggedInUser?.name || "User Avatar"}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-4">
                        {/* <DropdownMenuItem className="cursor-pointer">
                            <Link href="">Item One</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="">Item Two</Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="#" onClick={() => signOut()}>Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
