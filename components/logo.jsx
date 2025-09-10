import Image from "next/image";
// import logo from "./lws_logo.svg";
import Link from "next/link";
// import logo from "../public/assets/lws_logo.svg";
// import logo from "../public/assets/logo1.png";
// import logo from "../public/assets/logo2.png";
import { cn } from "@/lib/utils";
import logo from "../public/assets/brain-generator-idea.svg";

export const Logo = ({ className = "" }) => {
    return (
        <Link href="/" className="flex items-center gap-3 mr-8">
            <Image className={cn("max-w-[75px]")} src={logo} alt="logo" />
            <div className="flex flex-col">
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                        <span className="text-4xl font-bold text-blue-800 relative">
                            F
                        </span>
                        <span className="text-4xl font-bold text-blue-800">
                            ast
                        </span>
                        <span className="text-4xl font-bold text-green-600">
                            Learn
                        </span>
                    </div>

                    <p className="tracking-[0.35em] text-blue-800 text-lg font-medium">
                        ACADEMY
                    </p>
                </div>
            </div>
        </Link>
    );
};
