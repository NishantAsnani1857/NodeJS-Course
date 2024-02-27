const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").toString();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded._id) {
      throw new Error();
    }
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(user);

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(401)
  }
};

module.exports = auth;
