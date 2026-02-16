const Module = require("../models/Module");
const Question = require("../models/Question");

exports.createModule = async (req, res) => {
      try {
            const { name, description } = req.body;

            const module = await Module.create({
                  name,
                  description,
            });

            res.status(201).json({
                  message: "Module created successfully",
                  module,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
exports.createQuestion = async (req, res) => {
      try {
            const { moduleId, text, options, isCheckpoint } = req.body;

            // Validate module exists
            const module = await Module.findById(moduleId);
            if (!module) {
                  return res.status(404).json({ message: "Module not found" });
            }

            const question = await Question.create({
                  moduleId,
                  text,
                  options,
                  isCheckpoint,
            });

            res.status(201).json({
                  message: "Question created successfully",
                  question,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
exports.setModuleEntryQuestion = async (req, res) => {
      try {
            const { moduleId } = req.params;
            const { entryQuestionId } = req.body;

            const module = await Module.findById(moduleId);
            if (!module) {
                  return res.status(404).json({ message: "Module not found" });
            }

            const question = await Question.findById(entryQuestionId);
            if (!question) {
                  return res.status(404).json({ message: "Question not found" });
            }

            module.entryQuestionId = entryQuestionId;
            await module.save();

            res.json({
                  message: "Entry question set successfully",
                  module,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
exports.getModuleWithQuestions = async (req, res) => {
      try {
            const { moduleId } = req.params;

            const module = await Module.findById(moduleId);

            if (!module) {
                  return res.status(404).json({ message: "Module not found" });
            }

            const questions = await Question.find({ moduleId });

            res.json({
                  module,
                  questions,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
exports.updateOptionNext = async (req, res) => {
      try {
            const { questionId, optionId } = req.params;
            const { nextQuestionId, nextModuleId } = req.body;

            // Validate only one of them is provided
            if (!nextQuestionId && !nextModuleId) {
                  return res.status(400).json({
                        message: "Either nextQuestionId or nextModuleId must be provided",
                  });
            }

            if (nextQuestionId && nextModuleId) {
                  return res.status(400).json({
                        message: "Only one of nextQuestionId or nextModuleId can be provided",
                  });
            }

            const question = await Question.findById(questionId);

            if (!question) {
                  return res.status(404).json({ message: "Question not found" });
            }

            const option = question.options.id(optionId);

            if (!option) {
                  return res.status(404).json({ message: "Option not found" });
            }

            // If linking to question → validate question exists
            if (nextQuestionId) {
                  const nextQuestion = await Question.findById(nextQuestionId);
                  if (!nextQuestion) {
                        return res.status(404).json({
                              message: "Target nextQuestion not found",
                        });
                  }

                  option.nextQuestionId = nextQuestionId;
                  option.nextModuleId = undefined;
            }

            // If linking to module → validate module exists
            if (nextModuleId) {
                  const nextModule = await Module.findById(nextModuleId);
                  if (!nextModule) {
                        return res.status(404).json({
                              message: "Target nextModule not found",
                        });
                  }

                  option.nextModuleId = nextModuleId;
                  option.nextQuestionId = undefined;
            }

            await question.save();

            res.json({
                  message: "Option updated successfully",
                  question,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
