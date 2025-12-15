const express = require("express");
const helmet = require("helmet");

const app = express();

// Enable Helmet (adds security headers)
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Helmet security headers enabled!");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
