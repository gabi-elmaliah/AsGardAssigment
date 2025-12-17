import { PRIVATE_DURATION, GROUP_DURATION, STEP} from "../config/constatns";


const generateSlotsForWindow = (instructor, window, duration, type) => {
  const slots = [];

  for (
    let start = window.startMinutes;
    start + duration <= window.endMinutes;
    start += STEP
  ) {
    slots.push({
      instructorId: instructor._id.toString(),
      instructorName: instructor.name,
      skills: instructor.skills,   // ✅ ADD THIS
      day: window.day,
      startMinutes: start,
      endMinutes: start + duration,
      type
    });
  }

  return slots;
};



 const generateSlotsForInstructor = (instructor) => {
  const slots = [];

  for (const window of instructor.availability) {
    slots.push(
      ...generateSlotsForWindow(instructor, window, PRIVATE_DURATION, "private")
    );

    slots.push(
      ...generateSlotsForWindow(instructor, window, GROUP_DURATION, "group")
    );
  }
  return slots;
};

export default generateSlotsForInstructor;


