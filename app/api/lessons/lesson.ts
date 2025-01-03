import mongoose, { Schema, model, models } from "mongoose";

// Define the Lesson Schema
const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    fileUrl: { type: String, required: true },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }],
    subject: { type: String, default: "" },
    grade: { type: String, default: "" },
    tags: [{ type: String, default: [] }],
    isPrivate: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create and export the Lesson model
const Lesson = models.Lesson || model("Lesson", lessonSchema);

export default Lesson;
