const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    category:String,
    description:String,
    github:String,
    demo:String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;