const express = require("express");
const router = new express.Router();
const User = require("../db/models/userSchema");
const bcrypt = require("bcrypt");
const auth = require("../db/middleware/auth");
const multer = require("multer");
const sharp=require('sharp')
const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image file"));
    }
    cb(undefined, true);
  },
});


router.get("/user/me",auth,async (req, res) => {
  res.send(req.user);
});


router.get('/user/:id/avatar',async (req,res)=>{
  try{
    const user=await User.findById(req.params.id)
    if(!user || !user.avatar){
      throw new Error()
    }

    res.set('Content-Type','image/png')
    res.send(user.avatar)
  }catch(e){
    res.status(404)
  }
})

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ message: "Sucessfully logged out " });
  } catch (e) {
    res.send({ message: "User logged out" });
  }
});

router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: "Sucessfully logged out of all Instances" });
  } catch (e) {
    res.send({ message: "User logged out" });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist ");
    else {
      const validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        const token = await user.generateAuthToken();
        res.send({ user, token });
      } else {
        throw new Error("Unable to Login");
      }
    }
  } catch (e) {
    console.log("Oh no some error occured ", e);
    res.sendStatus(400);
  }
});

router.post("/users", async (req, res) => {
  const Duplicate=await User.findOne({email:req.body.email})
  if(Duplicate)
  {
    res.send({error:"User with same e-mail already exists"})
  }
  else
  {
    const user = new User({
      ...req.body
    });
    
    await user
      .save()
      .then((data) => {
        console.log(`User added to database sucessfully ${data}`);
        res.send({ data });
      })
      .catch((err) => {
        console.log(`Oh no some error occured ${err} `);
        res.sendStatus(400);
      });
  }
  
});




router.post("/user/me/avatar",auth,upload.single("avatar"), async (req, res) => {
  console.log(req.file);
  const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
  req.user.avatar=buffer
  await req.user.save()
  res.sendStatus(201)
},(error, req, res, next) => {
  res.status(400).send({ error: error.message });
});



router.patch("/user/me", auth, async (req, res) => {
  try {
    const id = req.user._id;
    const { name, email, password, age } = req.body;
    const newUser = {
      name,
      email,
      password,
      age,
    };
    const user = await User.findByIdAndUpdate(id, newUser, {
      new: true,
      runValidators: true,
    });
    if (!user) res.sendStatus(404);
    res.sendStatus(200)
  } catch (e) {
    console.log("Oh no error", e);
    res.send({ message: e });
  }
});

router.delete("/user/me", auth, async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndDelete(id);
    res.send(req.user);
  } catch (e) {
    console.log("Oh no error", e);
  }
});

router.delete("/user/me/avatar",auth,upload.single("avatar"), async (req, res) => {
  req.user.avatar=undefined
  await req.user.save()
  res.send("Avatar deleted")
},(error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

module.exports = router;
