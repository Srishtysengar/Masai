const express = require("express");
const { enrollStudent } = require("../controllers/enrollment.controller");

const router = express.Router();

router.post("/enroll", enrollStudent);

module.exports = router;
