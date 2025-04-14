const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const ReadingListBlog = require("./reading_list_blog");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasOne(ReadingList);
ReadingList.belongsTo(User);

Blog.belongsToMany(ReadingList, { through: ReadingListBlog });
ReadingList.belongsToMany(Blog, { through: ReadingListBlog });

ReadingList.hasMany(ReadingListBlog);
ReadingListBlog.belongsTo(ReadingList);

module.exports = {
  Blog,
  User,
  ReadingList,
  ReadingListBlog,
};
