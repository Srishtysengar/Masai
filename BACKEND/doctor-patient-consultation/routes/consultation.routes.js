const express = require("express");
const { createConsultation, getRecentConsultations } = require("../controllers/consultation.controller");

const router = express.Router();

router.post("/", createConsultation);
router.get("/recent", getRecentConsultations);

module.exports = router;
