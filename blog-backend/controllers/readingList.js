const router = require("express").Router();
const { Blog, User, ReadingList, ReadingListBlog } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  console.log("token ok");
  next();
};

router.post("/", async (req, res) => {
  const { blog_id, user_id } = req.body;
  try {
    await ReadingList.findOne({
      where: { userId: user_id },
    });
  } catch (err) {
    await ReadingList.create({
      userId: user_id,
    });
  }

  const readingList = await ReadingList.findOne({
    where: { userId: user_id },
  });

  const added = await ReadingListBlog.create({
    blogId: blog_id,
    readingListId: readingList.id,
  });

  res.json(added);
});

module.exports = router;
