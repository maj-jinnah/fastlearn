import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { User } from "./model/user-model"
import { dbConnection } from "./service/dbConnection"


export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Email and password are required");
                }
                
                await dbConnection();

                const { email, password } = credentials;
                
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid email or password");
                }
                
                return user;
            },
        })
    ],
})