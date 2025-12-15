const express = require("express");
const limiter = require("./middleware/rateLimiter");

const app = express();

// Apply rate limiter to all routes
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Welcome! Rate limiting is active.");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
