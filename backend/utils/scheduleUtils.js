import { MAX_GROUP_SIZE } from "../config/constants.js";

const overlaps = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && bStart < aEnd;
};

const groupHasSpace = (lesson) => {
  return lesson.students.length < MAX_GROUP_SIZE;
};

const studentCanTakeSlot = (student, slot) => {
  // skill compatibility
  if (!slot.skills.includes(student.style)) return false;

  // hard preferences
  if (student.preference === "private_only" && slot.type !== "private")
    return false;
  if (student.preference === "group_only" && slot.type !== "group")
    return false;

  return true;
};

const hasPoolConflict = (slot, lessons) => {
  return lessons.some((lesson) => {
    if (lesson.day !== slot.day) return false;

    return overlaps(
      lesson.startMinutes,
      lesson.endMinutes,
      slot.startMinutes,
      slot.endMinutes
    );
  });
};

const findJoinableGroupLesson = (student, lessons) => {
  if (student.preference === "private_only") return null;

  for (const lesson of lessons) {
    if (lesson.type !== "group") continue;
    if (lesson.style !== student.style) continue;
    if (!groupHasSpace(lesson)) continue;

    return lesson;
  }

  return null;
};

const instructorHasConflict = (lessons, slot) => {
  return lessons.some((l) => {
    const sameInstructor = l.instructor._id.toString() === slot.instructorId;
    const sameDay = l.day === slot.day;

    if (!sameInstructor || !sameDay) return false;

    return overlaps(
      l.startMinutes,
      l.endMinutes,
      slot.startMinutes,
      slot.endMinutes
    );
  });
};

const canCreateLessonInSlot = (student, slot, lessons) => {
  if (!studentCanTakeSlot(student, slot)) return false;
  if (instructorHasConflict(lessons, slot)) return false;
  if (hasPoolConflict(slot, lessons)) return false;

  return true;
};

const getSlotsByPreference = (student, slots) => {
  if (student.preference === "private") {
    return slots.filter((s) => s.type === "private");
  }

  if (student.preference === "group") {
    return slots.filter((s) => s.type === "group");
  }

  return [
    ...slots.filter((s) => s.type === "private"),
    ...slots.filter((s) => s.type === "group"),
  ];
};

export {
  overlaps,
  groupHasSpace,
  studentCanTakeSlot,
  instructorHasConflict,
  findJoinableGroupLesson,
  canCreateLessonInSlot,
  getSlotsByPreference,
};
