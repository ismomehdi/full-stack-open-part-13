const router = require("express").Router();
const { Blog, User, Session } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");
const { tokenExtractor } = require("./tokenExtractor");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
    where,
  });
  res.json(blogs);
});

// "Starting with Express 5, route handlers and middleware
// that return a Promise will call next(value) automatically
// when they reject or throw an error."
//
// This means that error handling middleware is not needed here.
//
// https://expressjs.com/en/guide/error-handling.html
router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  if (!req.blog) res.status(404).end();
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) return res.status(404).end();
  if (blog.userId !== req.decodedToken.id) return res.status(401).json();

  await Blog.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;
