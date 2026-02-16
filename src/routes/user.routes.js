const express = require("express");
const router = express.Router();

const {
      startModule,
      getCurrentQuestion,
      answerQuestion,
      handleDeepLink
} = require("../controllers/user.controller");

router.post("/start/:moduleId", startModule);
router.get("/current/:userId", getCurrentQuestion);
router.post("/answer", answerQuestion);

module.exports = router;
