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

  for (const student of students) {
    const joinableGroup = findJoinableGroupLesson(student, lessons);

    if (joinableGroup) {
      joinableGroup.students.push(student);
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

      break;
    }
  }

  return lessons.map((lesson) => ({
    ...lesson,
    start: minutesToDate(weekStart, lesson.day, lesson.startMinutes),
    end: minutesToDate(weekStart, lesson.day, lesson.endMinutes),
  }));
};

export default generateScheduleService;
