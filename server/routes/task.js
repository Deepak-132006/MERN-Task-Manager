import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(auth);

router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Logged-in user:", req.user);

    const { title, description, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: "Title Not Exists" });

    const task = new Task({
      title,
      description,
      dueDate,
      user: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const filter = {user: req.user.id}

    if(req.query.status){
      filter.status = req.query.status;
    }
    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Authorization denied" });

    res.status(200).json(task);
  } catch (error) {
    console.error("GET SINGLE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("UPDATE TASK ERROR: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Authorization Denied" });

    await task.deleteOne();
    res.json({ message: "Task removed successfully" });
  } catch (error) {
    console.error("DELETE TASK ERROR", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message: "Task not found"})

    if(task.user.toString() !== req.user.id) return res.status(401).json({message: "Authorization Denied"})

    task.status = task.status === "pending" ? "completed" : "pending"
    await task.save()
    res.json(task)
  } catch (error){
    console.error("TOGGLE STATUS ERROR", error);
    res.status(500).json({message: "Server error"})
  }
});

export default router;
