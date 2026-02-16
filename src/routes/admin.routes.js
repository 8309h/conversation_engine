const express = require("express");
const router = express.Router();

const {
      createModule,
      createQuestion,
      setModuleEntryQuestion,
      getModuleWithQuestions,
      updateOptionNext
} = require("../controllers/admin.controller");

router.post("/modules", createModule);
router.post("/questions", createQuestion);
router.patch("/modules/:moduleId/entry", setModuleEntryQuestion);
router.get("/modules/:moduleId", getModuleWithQuestions);
router.patch(
      "/questions/:questionId/options/:optionId",
      updateOptionNext
);


module.exports = router;
