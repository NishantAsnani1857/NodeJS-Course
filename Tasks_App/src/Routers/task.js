const express = require("express");
const router = new express.Router();
const Task = require("../db/models/tasksSchema");
const auth = require("../db/middleware/auth");
const User = require("../db/models/userSchema");

//Challange

//GET /tasks/completed=true
//GET /tasks/limit=2
//GET /tasks/skip=0
//GET /tasks/sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort={}
  
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if(req.query.sort){
    const parts=req.query.sort.split(':')
    sort[parts[0]]=parts[1]==='desc'?-1:1
  }

  const user = await User.findById(req.user._id)
    .populate({
      path:"tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      },
    })
    .then((data) => {
      res.send(data.tasks).status(200)
    })
    .catch((err) => {
      console.log(`Oh no some error occured ${err} `);
      res.sendStatus(500);
    });
});

router.get("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  const findtasks = await Task.findById(id)
    .then((data) => {
      if (!data) res.sendStatus(404).send();
      else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(`Oh no some error occured ${err} `);
      res.sendStatus(500);
    });
});

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  await task
    .save()
    .then((data) => {
      console.log(`task added to database sucessfully`);
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(`Oh no some error occured ${err} `);
      res.sendStatus(400);
    });
});

router.patch("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const userTasks = await User.findById(req.user._id).populate("tasks");
    const userTaskIds = userTasks.tasks.map((Task) => Task.id);
    if (!userTaskIds.includes(id) || userTaskIds.length === 0) {
      res.send({ error: "Cannot edit tasks of another user" });
    } else {
      const task = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.send({ task });
    }
  } catch (e) {
    console.log("Oh no error", e);
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const userTasks = await User.findById(req.user._id).populate("tasks");
    const userTaskIds = userTasks.tasks.map((Task) => Task.id);
    console.log(userTaskIds.includes(id));
    if (!userTaskIds.includes(id) || userTaskIds.length === 0) {
      res.send(404)
    } else {
      const task = await Task.findByIdAndDelete(id);
      res.status(201)
    }
  } catch (e) {
    console.log("Oh no error", e);
  }
});

module.exports = router;
