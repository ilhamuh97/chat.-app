import { config } from "dotenv";
import connectDB from "../lib/db";
import User from "../models/user.model";
import { seedUsers } from "./seedData";

config();

const seedDatabase = async () => {
    try {
        await connectDB();

        // Delete all existing documents
        await User.deleteMany({});
        console.log("Existing users removed");

        // Insert new data
        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();
