import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    start: {
      type: Date,
      required: true,
    },

    end: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["private", "group"],
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
