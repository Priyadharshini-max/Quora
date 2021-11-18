const express = require("express");
const router = express.Router();
const { Postquestion, Getquestion } = require("../Services/question.service");

router.post("/postquestion", Postquestion);
router.get("/getquestion", Getquestion);

module.exports = router;