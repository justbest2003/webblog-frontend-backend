const PostModel = require("../Models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

// Create Post controller
exports.createPost = async (req, res) => {
  // File upload
  const { path: cover } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All fields is required" });
  }
  const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover,
    author,
  });
  res.json(postDoc);
};

exports.getPosts = async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);
    if (authorId !== postDoc.author.toString()) {
      return res.status(403).send({
        message: "You cannot delete this post",
      });
    }
    await postDoc.deleteOne();
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong",
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  if (!id) return res.status(404).json({ message: "Post id is not Provided" });
  try {
    const postDoc = await PostModel.findById(id);
    if (authorId !== postDoc.author.toString()) {
      res.status(403).send({
        message: "You Cannnot update this post",
      });
      return;
    }

    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (req.file) {
      const { path } = req.file;
      postDoc.cover = path;
    }
    await postDoc.save();
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Somthing error occurrend white updating a post",
    });
  }
};
