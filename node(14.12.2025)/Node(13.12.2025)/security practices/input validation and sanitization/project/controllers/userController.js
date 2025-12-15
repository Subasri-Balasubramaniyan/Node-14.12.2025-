exports.registerUser = (req, res) => {
  res.json({
    message: "User registered successfully",
    data: req.body, // already validated & sanitized
  });
};
