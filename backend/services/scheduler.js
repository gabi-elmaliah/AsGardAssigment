
const slotsOverlap = (a, b) => {
  return (
    a.day === b.day &&
    a.instructorId === b.instructorId &&
    a.startMinutes < b.endMinutes &&
    b.startMinutes < a.endMinutes
  );
};

const canAddStudentToLesson = (student, lesson) => {
  if (lesson.type === "private") {
    return lesson.students.length === 0;
  }

  if (lesson.type === "group") {
    return lesson.students.length < lesson.maxStudents;
  }

  return false;
};