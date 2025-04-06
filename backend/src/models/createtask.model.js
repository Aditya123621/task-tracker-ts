import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const createTaskSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    task_title: {
      type: String,
      required: false,
      trim: true,
    },
    task_desc: {
      type: String,
      required: false,
      trim: true,
    },
    task_status: {
      type: String,
      required: true,
    },
    task_priority: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CreateTask = mongoose.model("CreateTask", createTaskSchema);
