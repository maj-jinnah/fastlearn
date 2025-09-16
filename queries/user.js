import { toPlainObject } from "@/lib/convert-data";
import { User } from "@/model/user-model";
import { dbConnection } from "@/service/dbConnection";


export async function getUserByEmail(email) {
  try {
    await dbConnection();

    const user = await User.findOne({ email })
      .select("-password -__v")
      .lean();
    return toPlainObject(user);
  } catch (error) {
    throw new Error(error)
  }
}

export async function getUserDetails(userId) {
  try {
    await dbConnection();

    const user = await User.findById(userId).select("-password").lean();
    return toPlainObject(user);
  } catch (error) {
    throw new Error(error)
  }
}