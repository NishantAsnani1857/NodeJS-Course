const express=require('express')
require("./db/mongoose");
const app=express();

app.use(express.json())

const userRoutes = require("./Routers/user");
const taskRoutes = require("./Routers/task");

app.use(userRoutes);
app.use(taskRoutes);
app.use(express.json());


module.exports=app;
