const express = require("express");
const Post = require("../../models/Post");

const router = express.Router();
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
  postGet,
} = require("./posts.controllers");

router.param("postId", async (req, res, next, postId) => {
  try {
    const foundPost = await Post.findById(postId);
    if (!foundPost) {
      return next({ status: 404, message: "post not found" });
    }
    req.post = foundPost;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", postsGet);
router.post("/", postsCreate);
router.delete("/:postId", postsDelete);
router.put("/:postId", postsUpdate);
router.get("/:postId", postGet);

module.exports = router;
