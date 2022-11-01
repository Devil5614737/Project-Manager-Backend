const express = require("express");
const jwt=require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/signup", async (req, res) => {
  const { name, email, password} = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) return res.status(400).json("user already registered");
    const salt = await bcrypt.genSalt(12);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const user = await newUser.save();
     const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
        },
        process.env.PRIVATE_KEY
      );
      return res.status(200).json(token);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
