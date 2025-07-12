import Image from "next/image";
// import logo from "./lws_logo.svg";
import logo from "../public/assets/lws_logo.svg";
import { cn } from "@/lib/utils";

export const Logo = ({ className = "" }) => {
  return (
    <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
  );
};
