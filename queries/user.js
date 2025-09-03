import { toPlainObject } from "@/lib/convert-data";
import { User } from "@/model/user-model";

const { dbConnection } = require("@/service/dbConnection");

export async function getUserByEmail(email) {
    const user = await User.findOne({ email })
    .select("-password -__v")
    .lean();
    return toPlainObject(user);
}

export async function getUserDetails(userId) {
  const user = await User.findById(userId).select("-password").lean();
  return toPlainObject(user);
}