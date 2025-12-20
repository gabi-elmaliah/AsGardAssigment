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

  // console.log(
  //   `Generated ${slots.length} slots for ${instructors.length} instructors.`
  // );
  // slots.forEach((slot, index) => {
  //   console.log(
  //     `Slot ${index + 1}: Instructor ${slot.instructorName} (${
  //       slot.instructorId
  //     }), Day ${slot.day}, ${slot.startMinutes}-${slot.endMinutes}, Type: ${
  //       slot.type
  //     }, Skills: ${slot.skills.join(", ")}`
  //   );
  // });

  const lessons = [];
  const conflicts = [];

  for (const student of students) {
    // Try to join an existing group lesson first: only if the student preferences is one of these: ["prefer_group", "group_only","prefer_private"]
    const joinableGroup = findJoinableGroupLesson(student, lessons);
    let assigned = false;

    if (joinableGroup) {
      joinableGroup.students.push(student);
      assigned = true;
      if (student.preference === "prefer_private") {
        conflicts.push({
          type: "PREFERENCE_VIOLATION",
          message: `${student.firstName} ${student.lastName} prefers private but was assigned to a group lesson`,
          student: {
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            preference: student.preference,
          },
          lesson: {
            id: joinableGroup.id,
            type: joinableGroup.type,
            style: joinableGroup.style,
            day: joinableGroup.day,
            startMinutes: joinableGroup.startMinutes,
            endMinutes: joinableGroup.endMinutes,
          },
        });
      }
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

  // 5) Convert to calendar dates
  const lessonsWithDates = lessons.map((lesson) => ({
    ...lesson,
    start: minutesToDate(weekStart, lesson.day, lesson.startMinutes),
    end: minutesToDate(weekStart, lesson.day, lesson.endMinutes),
  }));

  // 6) Return BOTH lessons and conflicts
  return {
    lessons: lessonsWithDates,
    conflicts,
  };
};

export default generateScheduleService;
