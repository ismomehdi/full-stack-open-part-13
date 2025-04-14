const router = require("express").Router();
const Session = require("../models/session");
const { tokenExtractor } = require("./tokenExtractor");

router.delete("/", tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      user_id: req.decodedToken.id,
    },
  });

  res.status(204).end();
});

module.exports = router;
