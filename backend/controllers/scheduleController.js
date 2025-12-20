import Student from "../models/Student.js";
import Instructor from "../models/Instructor.js";
import generateScheduleService from "../services/scheduleService.js";

export const generateSchedule = async (req, res) => {
  try {
    const { weekStart } = req.body;

    if (!weekStart) {
      return res.status(400).json({ message: "weekStart is required" });
    }

    const students = await Student.find();
    const instructors = await Instructor.find();

    const lessons = generateScheduleService({
      students,
      instructors,
      weekStart,
    });

    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
