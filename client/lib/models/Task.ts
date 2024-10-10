// models/Task.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
  user: string; // Assuming user is represented by an email or ID
}

const TaskSchema: Schema<ITask> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  dueDate: {
    type: Date,
  },
  user: {
    type: String,
    required: true,
  },
});

export const TaskModel: Model<ITask> = mongoose.models.Task || mongoose.model("Task", TaskSchema);
