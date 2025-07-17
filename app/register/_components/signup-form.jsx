"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function SignupForm({ role }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const firstName = formData.get("first-name");
        const lastName = formData.get("last-name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const userRole =
            role === "student" || role === "instructor" ? role : "student";

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    userRole,
                }),
            });

            const data = await response.json();

            if (response.ok && response.status === 201) {
                toast.success("Registration successful");
                form.reset();
                router.push("/login");
            } else {
                toast.error(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    name="first-name"
                                    placeholder="Max"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    name="last-name"
                                    placeholder="Robinson"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2 justify-center">
                                    <Spinner /> Creating...
                                </span>
                            ) : (
                                "Create an account"
                            )}
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
