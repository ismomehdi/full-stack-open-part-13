const { Session } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);

      Session.findOne({
        where: {
          user_id: req.decodedToken.id,
          token: authorization.substring(7),
        },
      }).then((session) => {
        if (!session) {
          return res.status(401).json({ error: "token invalid" });
        }
      });
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

module.exports = { tokenExtractor };
