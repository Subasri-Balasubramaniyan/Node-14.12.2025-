const express = require("express");
const router = express.Router();

const { registerValidator } = require("../validators/userValidator");
const validate = require("../middleware/validate");
const { registerUser } = require("../controllers/userController");

router.post("/register", registerValidator, validate, registerUser);

module.exports = router;
