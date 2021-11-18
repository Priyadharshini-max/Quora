const express = require("express");
const router = express.Router();

const { updateAnswer, displayAnswer } = require("../Services/answer.service");

router.post("/postanswer/:id", updateAnswer);
router.get("/getanswer/:id", displayAnswer);
module.exports = router;