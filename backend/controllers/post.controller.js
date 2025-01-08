const PostModel = require("../models/Posttest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

// Create Post controller
exports.createPost = async (req, res) => {
  //File upload
 if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const { path } = req.file.firebaseUrl;

  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All Fields is requires" });
  }

  try {
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover: req.file.firebaseUrl,
      author,
    });
    if (!postDoc) {
      res.status(400).send({
        message: "Cannot create new post!",
      });
      return;
    }
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while creating a new post.",
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "An error occurred while fetching posts",
    });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.findById(id).populate("author", [
      "username",
    ]);
    if (!postDoc) {
      res.status(404).send({
        message: "Post notfound",
      });
      return;
    }
    res.json(postDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting post Details",
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
      postDoc.cover = req.file.firebaseUrl;
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

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);

    if (!postDoc) {
      return res.status(404).send({
        message: "Post not found",
      });
    }

    if (authorId !== postDoc.author.toString()) {
      return res.status(403).send({
        message: "You are not authorized to delete this post",
      });
    }

    await PostModel.findByIdAndDelete(id);

    res.status(200).send({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: error.message || "An error occurred while deleting the post",
    });
  }
};

// Get posts by userId
exports.getPostByAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.find({author: id}).populate("author", [
      "username",
    ]);
    if (!postDoc) {
      return res.status(404).send({
        message: "Post Not Found!",
      });
    }
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong while getting post by author!",
    });
  }
};


