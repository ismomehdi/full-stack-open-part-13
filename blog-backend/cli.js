require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, options = {
	logging: false
})

class Blog extends Sequelize.Model {}

Blog.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	author: {
		type: DataTypes.STRING,
	},
	url: {
		type: DataTypes.STRING,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	likes: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, {
	sequelize,
	modelName: 'blog',
	timestamps: false
});

const main = async () => {
  try {
    await sequelize.authenticate()

		const blogs = await Blog.findAll()

		let blog
		blogs.forEach(b => {
			blog = b.toJSON()

			console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
		})

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
