import { User } from "@/model/user-model";

const { dbConnection } = require("@/service/dbConnection");

export async function getUserByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
}