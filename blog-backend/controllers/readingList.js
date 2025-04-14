const router = require("express").Router();
const { ReadingList, ReadingListBlog } = require("../models");
const { tokenExtractor } = require("./tokenExtractor");

router.post("/", tokenExtractor, async (req, res) => {
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

router.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findOne({
    where: { userId: req.decodedToken.id },
  });

  const readingListBlog = await ReadingListBlog.findOne({
    where: { blog_id: req.params.id, readingListId: readingList.id },
  });

  if (!readingListBlog)
    return res.status(404).json({ error: "Reading list blog not found" });

  readingListBlog.read = req.body.read;
  await readingListBlog.save();

  res.json(readingListBlog);
});

module.exports = router;
