const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middlewares/authMiddleware");

// Nested under projects
router.post("/projects/:projectId/tasks", protect, createTask);
router.get("/projects/:projectId/tasks", protect, getTasks);

// Direct task actions
router.patch("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);

module.exports = router;
