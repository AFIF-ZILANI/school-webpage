import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new Error(
        "Please define the MONGO_URI environment variable inside .env.local",
    );
}
let isConnected: boolean = false; // Track the connection status

export const connectDB = async () => {
    if (isConnected) {
        console.log("Already connected to the database");
        return;
    }

    try {
        if (mongoose.connection.readyState >= 1) {
            isConnected = true;
            console.log("Use existing database connection");
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI!);
        isConnected = true;
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Database connection failed");
    }
};
