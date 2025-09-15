// server/models/causeModel.js
import mongoose from "mongoose";

const causeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Cause = mongoose.model("Cause", causeSchema);
export default Cause;
