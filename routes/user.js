const { signUp,signIn,signOut } = require("../controllers/user");
const express = require("express");
const router = express.Router();
router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/sign-out", signOut);
module.exports = router;
