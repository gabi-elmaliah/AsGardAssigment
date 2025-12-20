import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Instructor from "../models/Instructor.js";

dotenv.config();

const seedInstructors = async () => {
  try {
    await connectDB();

    await Instructor.deleteMany();

    const instructors = [
      {
        name: "Yotam",
        skills: ["freestyle", "breaststroke", "butterfly", "backstroke"],
        availability: [
          { day: 1, startMinutes: 960, endMinutes: 1200 },
          { day: 4, startMinutes: 960, endMinutes: 1200 },
        ],
      },
      {
        name: "Yoni",
        skills: ["breaststroke", "butterfly"],
        availability: [
          { day: 2, startMinutes: 480, endMinutes: 900 },
          { day: 3, startMinutes: 480, endMinutes: 900 },
          { day: 4, startMinutes: 480, endMinutes: 900 },
        ],
      },
      {
        name: "Jony",
        skills: ["freestyle", "breaststroke", "butterfly", "backstroke"],
        availability: [
          { day: 0, startMinutes: 600, endMinutes: 1140 },
          { day: 2, startMinutes: 600, endMinutes: 1140 },
          { day: 4, startMinutes: 600, endMinutes: 1140 },
        ],
      },
    ];

    await Instructor.insertMany(instructors);

    console.log("Instructors seeded");
    process.exit(0);
  } catch (error) {
    console.error("Instructor seeding failed:", error.message);
    process.exit(1);
  }
};

seedInstructors();
