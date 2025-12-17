import Student from "../models/Student.js";


const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single student
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: "Invalid student ID" });
  }
};

/**
 * @desc    Create new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, style, preference } = req.body;

    if (!firstName || !lastName || !style || !preference) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.create({
      firstName,
      lastName,
      style,
      preference,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc    Update student
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.firstName = req.body.firstName ?? student.firstName;
    student.lastName = req.body.lastName ?? student.lastName;
    student.style = req.body.style ?? student.style;
    student.preference = req.body.preference ?? student.preference;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc    Delete student
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.deleteOne();
    res.json({ message: "Student removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };







