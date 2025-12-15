const express = require("express");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

/* 🔥 REQUIRED */
app.use(express.json()); // <-- THIS FIXES THE ERROR

app.use("/api/comments", commentRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
