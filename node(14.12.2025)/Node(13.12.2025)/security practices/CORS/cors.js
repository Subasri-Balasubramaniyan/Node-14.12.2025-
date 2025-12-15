const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "CORS allowed successfully!" });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
