const db = require("../config/db");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // ✅ SAFE: Parameterized Query
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.execute(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: results[0] });
  });
};
