const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const ReadingListBook = require("./reading_list_book");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(ReadingList, { through: ReadingListBook });
ReadingList.belongsTo(User, { through: ReadingListBook });

module.exports = {
  Blog,
  User,
  ReadingList,
  ReadingListBook,
};
