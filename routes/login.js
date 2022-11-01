const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
        },
        process.env.PRIVATE_KEY
      );
      res.status(200).json(token);
      
    }
    if (!validPassword) return res.status(400).json("invalid credentials");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
