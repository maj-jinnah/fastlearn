import { User } from "@/model/user-model";
import { dbConnection } from "@/service/dbConnection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    await dbConnection();

    const { firstName, lastName, email, password, userRole } = await request.json();
    if (!firstName || !lastName || !email || !password || !userRole) {
        return new NextResponse(JSON.stringify({ error: "All fields are required" }), {
            status: 400,
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse(JSON.stringify({ error: "This email is already being used" }), {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: userRole
        };

        const response = await User.create(user);

        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to create user" }), {
            status: 500,
        });
    }
};
