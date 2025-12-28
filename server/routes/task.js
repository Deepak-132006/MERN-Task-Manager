import express, { Router } from "express";
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
    try{
        const tasks = await Task.find({user: req.user.id})
        .sort({createdAt: -1})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
})

export default router;
