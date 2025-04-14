const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ReadingListBlog extends Model {}

ReadingListBlog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    readingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "reading_list", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "ReadingListBlog",
    tableName: "reading_list_blog",
  }
);

module.exports = ReadingListBlog;
