const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

// "Starting with Express 5, route handlers and middleware
// that return a Promise will call next(value) automatically
// when they reject or throw an error."
//
// This means that error handling middleware is not needed here.
//
// https://expressjs.com/en/guide/error-handling.html
router.post('/', async (req, res) => {
	const blog = await Blog.create(req.body)
	res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
	if (!req.blog) res.status(404).end()
	req.blog.likes = req.body.likes
	await req.blog.save()
	res.json(req.blog)
})

router.delete('/:id', async (req, res) => {
	await Blog.destroy({ where: { id: req.params.id } })
	res.status(204).end()
})

module.exports = router
