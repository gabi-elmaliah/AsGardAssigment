import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
      min: 0,
      max: 6
    },
    startMinutes: {
      type: Number,
      required: true,
      min: 0,
      max: 1440
    },
    endMinutes: {
      type: Number,
      required: true,
      min: 0,
      max: 1440
    }
  },
  { _id: false }
);

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    skills: {
      type: [String],
      required: true,
      enum: ["freestyle", "breaststroke", "butterfly", "backstroke"]
    },
    availability: {
      type: [availabilitySchema],
      required: true
    }
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
