import mongoose from "mongoose";


export async function dbConnection() {
    try {
        const connection = await mongoose.connect(String(process.env.MONGODB_CONNECTION_URI));
        console.log("Database connected successfully");
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}