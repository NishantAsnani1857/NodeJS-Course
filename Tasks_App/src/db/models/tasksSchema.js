//Challange
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref:'user',
    required:true},
},
{
  timestamps:true
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
