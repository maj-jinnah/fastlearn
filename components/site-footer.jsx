import { cn } from "@/lib/utils";
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter({ className }) {
    return (
        <footer
            className={cn(className) + "bg-gray-50 border-t border-gray-200 mt-10"}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Empowering learners worldwide with cutting-edge
                            courses and expert instruction. Transform your
                            career with our comprehensive learning platform.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                            Popular Courses
                        </h4>
                        <ul className="space-y-2">
                            {[
                                "Design",
                                "Development",
                                "IT & Software",
                                "Business",
                            ].map((course) => (
                                <li key={course}>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                                    >
                                        {course}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            {[
                                "Student Portal",
                                "Course Catalog",
                                "Career Services",
                                "Help Center",
                                "Community Forum",
                                "Blog & Articles",
                            ].map((resource) => (
                                <li key={resource}>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                                    >
                                        {resource}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                            Get in Touch
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                <a
                                    href="mailto:maj.jinnah1999@gmail.com"
                                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                                >
                                    maj.jinnah1999@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                <a
                                    href="tel:+880 1553 412880"
                                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm"
                                >
                                    +880 1553 412880
                                </a>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600 text-sm">
                                    Thana para, Khoksa
                                    <br />
                                    Kushtia, Bangladesh
                                </span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="pt-2">
                            <h5 className="text-sm font-medium text-gray-900 mb-3">
                                Follow Us
                            </h5>
                            <div className="flex space-x-3">
                                {[
                                    {
                                        icon: Facebook,
                                        href: "#",
                                        label: "Facebook",
                                    },
                                    {
                                        icon: Twitter,
                                        href: "#",
                                        label: "Twitter",
                                    },
                                    {
                                        icon: Linkedin,
                                        href: "#",
                                        label: "LinkedIn",
                                    },
                                    {
                                        icon: Instagram,
                                        href: "#",
                                        label: "Instagram",
                                    },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-emerald-600 hover:text-white transition-all duration-200"
                                        aria-label={label}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-600">
                            © 2025 FastLearn Academy. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            {[
                                "Privacy Policy",
                                "Terms of Service",
                                "Cookie Policy",
                            ].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
