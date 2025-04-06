// middleware/taskValidation.middleware.js

export const validateHeadingOrDescription = (req, res, next) => {
  const { task_title, task_desc } = req.body;

  if (!task_title?.trim() && !task_desc?.trim()) {
    return res.status(400).json({
      success: false,
      message: "At least one of 'task title' or 'task desc' must be provided.",
    });
  }

  // If valid, move to the controller
  next();
};
