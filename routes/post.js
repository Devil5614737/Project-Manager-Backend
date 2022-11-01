const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");

// implementing uploading feature

router.post("/create-project", auth, async (req, res) => {
  const { title, category, description, github, demo } = req.body;
  const newPost = new Post({
    title,
    category,
    description,
    github,
    demo,
    postedBy: req.user._id,
  });
  try {
    const post = await newPost.save();
    res.status(200).json("uploaded");
  } catch (e) {
    console.log(e);
  }
});

//getting all posts
router.get("/projects", auth, async (req, res) => {
  const posts = await Post.find().populate("postedBy", "_id name");
  res.status(200).json(posts);
});

// getting post by id
router.get("/projects/:id", auth, async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate("postedBy", "_id name");
  if (post === null) return res.send("no project found");
  return res.status(200).json(post);
});

router.post("/remove-project", auth, (req, res) => {
  Post.findByIdAndDelete(req.body.projectId, {
    new: true,
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
