// 'use server';

// import { signIn } from "@/auth";

// export async function credentialsLogin(formData) {

//     try {
//         const response = await signIn('credentials', {
//             email: formData.get("email"),
//             password: formData.get("password"),
//             redirect: false,
//         });

//         console.log("Login response:", response);

//         return response;
//     } catch (error) {
//         console.error("Login error:", error);
//         throw new Error('Login failed. Please try again.');
//     }
// } 


'use server';

import { signIn } from "@/auth";
import { dbConnection } from "@/service/dbConnection";

export async function credentialsLogin(formData) {
    try {
        await dbConnection();

        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (response?.error) {
            return { success: false, error: "Invalid email or password" };
        }

        return response; // success
    } catch (error) {
        const cause = error?.cause;
        const causeMessage = cause?.message;

        if (causeMessage === "UserNotFound") {
            return { success: false, error: "No account found with this email." };
        }

        if (causeMessage === "InvalidPassword") {
            return { success: false, error: "Invalid email or password" };
        }

        if (causeMessage === "MissingCredentials") {
            return { success: false, error: "Please provide both email and password." };
        }

        // Fallback for all other Auth.js errors
        if (error?.type === 'CallbackRouteError') {
            return { success: false, error: "Invalid email or password" };
        }

        console.error("Unexpected login error:", error);
        return { success: false, error: "Something went wrong. Please try again later." };
    }
}
