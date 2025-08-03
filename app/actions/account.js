'use server';

import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { revalidatePath } from "next/cache";

export async function updateUserInfo( data) {
    try {
        const session = await auth();
        const filter = { email: session?.user?.email };
        await User.findOneAndUpdate(filter, data);

        revalidatePath('/account');
        return { success: true, message: "User information updated successfully." };
    } catch (error) {
        console.error("Error updating user info:", error);
        throw new Error("Failed to update user information");
    }
}