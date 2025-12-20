import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Student from "../models/Student.js";
import students from "../data/students.js";

dotenv.config();

const seedStudents = async () => {
  try {
    await connectDB();

    await Student.deleteMany();


    await Student.insertMany(students);

    console.log("students seeded");
    process.exit(0);
  } catch (error) {
    console.error("student seeding failed:", error.message);
    process.exit(1);
  }
};

seedStudents();
