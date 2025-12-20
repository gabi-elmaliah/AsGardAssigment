import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    style: {
      type: String,
      required: true,
      enum: ["freestyle", "breaststroke", "butterfly", "backstroke"],
    },
    preference: {
      type: String,
      required: true,
      enum: ["private_only", "group_only", "private/group"],
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
