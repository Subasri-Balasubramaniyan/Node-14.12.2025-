const sanitize = require("../utils/sanitize");

exports.addComment = (req, res) => {
  const { comment } = req.body;

  const safeComment = sanitize(comment);

  res.json({
    message: "XSS prevented successfully",
    original: comment,
    sanitized: safeComment,
  });
};
