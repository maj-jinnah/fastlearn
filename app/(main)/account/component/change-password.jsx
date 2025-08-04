"use client";

import { updateUserPassword } from "@/app/actions/account";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password?.newPassword !== password?.confirmPassword) {
            toast.error("New password and Confirm password do not match.");
            setIsLoading(false);
            return;
        }

        // action call to change password
        try {
            const response = await updateUserPassword({
                loggedInUserEmail: email,
                currentPassword: password.oldPassword,
                newPassword: password.newPassword,
            });

            if (response?.success) {
                toast.success("Password changed successfully.");
            } else {
                toast.error("Failed to change password. Please try again.");
            }
        } catch (error) {
            // console.error("Error changing password:", error);
            toast.error(error.message || "An unexpected error occurred.");
        } finally {
            setPassword({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">Change password :</h5>
            <form onSubmit={handlePasswordChange}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">Old password :</Label>
                        <Input
                            type="password"
                            placeholder="Old password"
                            required
                            value={password?.oldPassword}
                            name="oldPassword"
                            id="oldPassword"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">New password :</Label>
                        <Input
                            type="password"
                            placeholder="New password"
                            required
                            value={password?.newPassword}
                            name="newPassword"
                            id="newPassword"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Re-type New password :
                        </Label>
                        <Input
                            type="password"
                            placeholder="Re-type New password"
                            required
                            value={password?.confirmPassword}
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/*end grid*/}
                {/* <Button className="mt-5" type="submit">
                    Save password
                </Button> */}

                <Button
                    type="submit"
                    className="mt-5 cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2 justify-center">
                            <Spinner /> Saving...
                        </span>
                    ) : (
                        "Save password"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
