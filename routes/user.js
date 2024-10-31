const { signUp } = require("../controllers/user");
const express = require("express");
const router = express.Router();
router.post("/sign-in",signIn);
router.post("/sign-up", signUp);

module.exports = router;
