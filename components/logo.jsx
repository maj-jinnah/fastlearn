import Image from "next/image";
// import logo from "./lws_logo.svg";
import Link from "next/link";
// import logo from "../public/assets/lws_logo.svg";
// import logo from "../public/assets/logo1.png";
import logo from "../public/assets/logo2.png";
import { cn } from "@/lib/utils";

export const Logo = ({ className = "" }) => {
    return (
        <Link href="/" className="flex items-center">
            <Image
                className={cn("max-w-[300px]", className)}
                src={logo}
                alt="logo"
            />
        </Link>
    );
};
