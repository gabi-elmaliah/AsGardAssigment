import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Student from "../models/Student.js";

dotenv.config();

const seedStudents = async () => {
  try {
    await connectDB();

    await Student.deleteMany();

    const students = [
      {
        firstName: "Noam",
        lastName: "Levi",
        style: "freestyle",
        preference: "prefer_group"
      },
      {
        firstName: "Dana",
        lastName: "Cohen",
        style: "breaststroke",
        preference: "group_only"
      },
      {
        firstName: "Eli",
        lastName: "Bar",
        style: "butterfly",
        preference: "private_only"
      }
    ];

    await Student.insertMany(students);

    console.log("✅ Students seeded");
    process.exit(0);
  } catch (error) {
    console.error("❌ Student seeding failed:", error.message);
    process.exit(1);
  }
};

seedStudents();
