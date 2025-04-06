import { CreateTask } from "../models/createtask.model.js";

// Controller to create a new task
export const createTaskController = async (req, res) => {
  try {
    const { task_title, task_desc, task_status, task_priority } = req.body;

    // Check if all required fields are provided
    if (!task_status || !task_priority) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: task status and task priority are required.",
      });
    }

    // Create new task
    const newTask = new CreateTask({
      task_title,
      task_desc,
      task_status,
      task_priority,
    });

    // Save to database
    await newTask.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller to get all tasks
export const getAllTasksController = async (req, res) => {
  try {
    const tasks = await CreateTask.find(); // You can add filters or sorting here if needed

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller to update an existing task
export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { task_title, task_desc, task_status, task_priority } = req.body;
    // Find task by ID and update
    const updatedTask = await CreateTask.findByIdAndUpdate(
      id,
      {
        task_title,
        task_desc,
        task_status,
        task_priority,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
