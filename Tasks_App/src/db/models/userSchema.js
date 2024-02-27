const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./tasksSchema");

const userSchema = Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    minLength: 6,
    validate(value) {
      if (value.includes("password"))
        throw new Error("password field cannot contain password");
    },
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error(" Age must be positive ");
    },
    default: 0,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar:{
    type:Buffer
  }
}
,{
  timestamps:true
}
);

//MiddleWare

// Helps create virtual field on relationship between two Schemas. Here it creates tasks method on user that stores all tasks created by user.

userSchema.virtual("tasks", {
  ref: "task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  //Need not be called on user in routes runs explicitly.
  const user = this;

  const sourceObject = user.toObject();
  const fieldsToCopy = ["name", "email", "age", "_id"];

  // Target object with only selected fields copied from sourceObject
  const userObject = {};
  fieldsToCopy.forEach((field) => {
    if (sourceObject.hasOwnProperty(field)) {
      //Checking for fields
      ({ [field]: userObject[field] } = sourceObject);
    }
  });
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "thisismysecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};



userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

// userSchema.pre('remove', async function(next) {
//   try {
//     // Remove all tasks associated with the user being removed
//     await Task.deleteMany({ user: this._id });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

//Written seperately because update bypasses middleware in mongoose
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 12);
  }
  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
