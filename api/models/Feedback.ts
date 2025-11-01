import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, enum: ["bug", "suggestion", "feedback"], default: "feedback" },
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
  page: String,
});

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
