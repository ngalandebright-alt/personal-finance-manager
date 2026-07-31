const express = require("express");
const route = express.Router();
const {
    register,
    login,
} = require("../controllers/authController");
const router = require("./transactionRoutes");

router.post("/register", register);
router.post("/login", login);

module.exports = router;