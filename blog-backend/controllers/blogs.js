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

router.post('/', async (req, res) => {
	try {
		const blog = await Blog.create(req.body)
		res.json(blog)
	} catch (error) {
		return res.status(400).json({ error })
	}
})

router.put('/:id', blogFinder, async (req, res) => {
	if (!req.blog) res.status(404).end()

	try {
		req.blog.likes = req.body.likes
		await req.blog.save()
		res.json(req.blog)
	} catch (error) {
		return res.status(400).json({ error })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		await Blog.destroy({ where: { id: req.params.id } })
		res.status(204).end()
	} catch (error) {
		return res.status(400).json({ error })
	}
})

module.exports = router
