import generateSlotsForInstructor from "./slotGenerator.js";
import { minutesToDate } from "../utils/timeMapper.js";
import {
  findJoinableGroupLesson,
  canCreateLessonInSlot,
  getSlotsByPreference,
} from "../utils/scheduleUtils.js";

const generateScheduleService = ({ students, instructors, weekStart }) => {
  let slots = [];

  for (const instructor of instructors) {
    slots.push(...generateSlotsForInstructor(instructor));
  }

  slots.sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.startMinutes - b.startMinutes;
  });

  const lessons = [];
  const conflicts = [];

  for (const student of students) {
    // Try to join an existing group lesson first
    const joinableGroup = findJoinableGroupLesson(student, lessons);
    let assigned = false;

    if (joinableGroup) {
      joinableGroup.students.push(student);
      assigned = true;
      continue;
    }

    const orderedSlots = getSlotsByPreference(student, slots);

    for (const slot of orderedSlots) {
      if (!canCreateLessonInSlot(student, slot, lessons)) continue;

      lessons.push({
        id: `${slot.instructorId}-${slot.day}-${slot.startMinutes}-${slot.type}`,
        type: slot.type,
        style: student.style,
        day: slot.day,
        startMinutes: slot.startMinutes,
        endMinutes: slot.endMinutes,
        instructor: {
          _id: slot.instructorId,
          name: slot.instructorName,
        },
        students: [student],
      });

      assigned = true;
      break;
    }

    if (!assigned) {
      conflicts.push({
        type: "UNSCHEDULED_STUDENT",
        message: `Could not schedule ${student.firstName} ${student.lastName}`,
        student: {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          style: student.style,
          preference: student.preference,
        },
      });
    }
  }

  // Convert to calendar dates
  const lessonsWithDates = lessons.map((lesson) => ({
    ...lesson,
    start: minutesToDate(weekStart, lesson.day, lesson.startMinutes),
    end: minutesToDate(weekStart, lesson.day, lesson.endMinutes),
  }));

  return {
    lessons: lessonsWithDates,
    conflicts,
  };
};

export default generateScheduleService;
