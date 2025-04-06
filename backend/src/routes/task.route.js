import { Router } from "express";
import {
  createTaskController,
  getAllTasksController,
  updateTaskController,
} from "../controllers/task.controller.js";
import { validateHeadingOrDescription } from "../middlewares/taskValidation.middleware.js";

const router = Router();

router.post("/create-task", validateHeadingOrDescription, createTaskController);
router.get("/get-task", getAllTasksController);
router.put("/update-task/:id", updateTaskController);

export default router;
