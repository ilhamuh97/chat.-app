import cron from "node-cron";
import connectDB from "./db";
import User from "../models/user.model";
import Message from "../models/message.model";
import { seedUsers } from "../seeds/seedData";

export const resetDatabase = async () => {
    try {
        await connectDB();

        console.log("[RESET] Clearing collections...");

        await Promise.all([
            User.deleteMany({}),
            Message.deleteMany({}),
        ]);

        console.log("[RESET] Collections cleared.");

        if (seedUsers?.length) {
            await User.insertMany(seedUsers);
            console.log("[RESET] Users reseeded.");
        }

        console.log("[RESET] Done.");
    } catch (err) {
        console.error("[RESET] Error during weekly reset:", err);
    }
};

// Schedule a cron job every Sunday at 00:00
cron.schedule("0 0 * * 0", async () => {
    console.log("[CRON] Weekly reset triggered");
    await resetDatabase();
});
