const { signUp } = require("../controllers/user");
const express = require("express");
const router = express.Router();



router.post("/sign-up", signUp);

module.exports = router;
