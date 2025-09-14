import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logo from "../public/assets/brain-generator-idea.svg";

export const Logo = ({ hidden }) => {
    return (
        <Link href="/" className="flex justify-center items-center gap-3">
            <Image className={cn( "max-w-[75px]")} src={logo} alt="logo" />
            <div className={hidden ? "hidden" : "flex flex-col"}>
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
