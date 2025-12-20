import Student from "../models/Student.js";
import Instructor from "../models/Instructor.js";
import Lesson from "../models/Lesson.js";
import generateScheduleService from "../services/scheduleService.js";

export const generateSchedule = async (req, res) => {
  try {
    const { weekStart } = req.body;

    if (!weekStart) {
      return res.status(400).json({ message: "weekStart is required" });
    }

    const students = await Student.find();
    const instructors = await Instructor.find();

    await Lesson.deleteMany({});

    const { lessons, conflicts } = generateScheduleService({
      students,
      instructors,
      weekStart,
    });

    const lessonDocs = lessons.map((lesson) => ({
      start: lesson.start,
      end: lesson.end,
      type: lesson.type,
      instructor: lesson.instructor._id,
      students: lesson.students.map((s) => s._id),
    }));

    await Lesson.create(lessonDocs);

    res.json({ lessons, conflicts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
