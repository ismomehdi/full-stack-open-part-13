const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ReadingListBook extends Model {}

ReadingListBook.init(
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "ReadingListBook",
    tableName: "reading_list_blog",
  }
);

module.exports = ReadingListBook;
