import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    day: {
      type: Number,          
      required: true,
      min: 0,
      max: 6
    },

    startMinutes: {
      type: Number,          // minutes from midnight
      required: true,
      min: 0,
      max: 1440
    },

    endMinutes: {
      type: Number,
      required: true,
      min: 0,
      max: 1440
    },

    type: {
      type: String,
      required: true,
      enum: ["private", "group"]
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);


lessonSchema.pre("save", function (next) {
  if (this.type === "private" && this.students.length !== 1) {
    return next(
      new Error("Private lesson must contain exactly one student")
    );
  }
  if (this.type === "group" && this.students.length < 2) {
    return next(
      new Error("Group lesson must contain at least two students")
    );
  }
  next();
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
