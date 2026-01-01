const Task = require("../models/Task");
const Project = require("../models/Project");

// @desc    Create task in a project
// @route   POST /api/projects/:projectId/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const { projectId } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const task = await Task.create({
      title,
      project: projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.status = status || task.status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
