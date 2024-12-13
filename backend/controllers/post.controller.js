const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.create = async (req, res) => {
  const token = req.headers["x-access-token"];
  //TBC
}