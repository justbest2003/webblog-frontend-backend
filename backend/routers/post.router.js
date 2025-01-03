const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middleware");

//http://localhost:5000/api/v1/post
router.post("", authJwt.verifyToken, upload, uploadToFirebase, postController.createPost);

//http://localhost:5000/api/v1/post
router.get("", postController.getPosts)

//http://localhost:5000/api/v1/post/id
router.get("/:id", postController.getById)

//http://localhost:5000/api/v1/post/author/id
router.get("/author/:id", postController.getPostByAuthor)

router.delete("/:id", authJwt.verifyToken, postController.deletePost);

router.put("/:id", authJwt.verifyToken, upload, uploadToFirebase, postController.updatePost);

module.exports = router;
