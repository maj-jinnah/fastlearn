'use server';

import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { dbConnection } from "@/service/dbConnection";

export async function updateUserInfo(data) {
    try {
        await dbConnection();
        const session = await auth();
        const filter = { email: session?.user?.email };
        await User.findOneAndUpdate(filter, data);

        revalidatePath('/account');
        return { success: true, message: "User information updated successfully." };
    } catch (error) {
        // console.error("Error updating user info:", error);
        throw new Error("Failed to update user information");
    }
}

export async function updateUserPassword({ loggedInUserEmail, currentPassword, newPassword }) {
    try {
        await dbConnection();
        
        const session = await auth();
        const userEmail = session?.user?.email;

        if (!userEmail || userEmail !== loggedInUserEmail) {
            throw new Error("User not authenticated. Please log in.");
        }

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            throw new Error("User does not match the provided email.");
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new Error("Current password is incorrect.");
        }

        if (currentPassword === newPassword) {
            throw new Error("New password must be different from the current password.");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        // await User.findOneAndUpdate({ email: userEmail }, { password: hashedNewPassword });
        // user.set({ password: hashedNewPassword });
        user.password = hashedNewPassword;
        await user.save();

        revalidatePath("/account");

        return { success: true, message: "Password updated successfully." };
    } catch (error) {
        // console.error("Error updating user password:", error);
        throw new Error(error.message || "Failed to update password.");
    }
}
