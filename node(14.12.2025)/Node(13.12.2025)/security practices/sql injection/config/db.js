const mysql = require("mysql2");

// Create connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sree@Mani1210",
  database: "security_demo",
});

module.exports = db;
