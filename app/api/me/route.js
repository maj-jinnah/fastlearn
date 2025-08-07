const { auth } = require("@/auth");
const { getUserByEmail } = require("@/queries/user");
const { dbConnection } = require("@/service/dbConnection");
const { NextResponse } = require("next/server");

export const GET = async (request) => {
    const session = await auth();
    if (!session?.user) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized access" }), {
            status: 401,
        });
    }
    await dbConnection();

    try {
        const user = await getUserByEmail(session?.user?.email);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User not found" }), {
                status: 404,
            });
        }
        return new NextResponse(JSON.stringify(user), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
        });
    }
} 