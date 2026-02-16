const Module = require("../models/Module");
const Question = require("../models/Question");
const UserState = require("../models/UserState");
const ConversationHistory = require("../models/ConversationHistory");
exports.startModule = async (req, res) => {
      try {
            const { moduleId } = req.params;
            const { userId } = req.body;

            const module = await Module.findById(moduleId);

            if (!module || !module.entryQuestionId) {
                  return res.status(404).json({
                        message: "Module not found or entry question not set",
                  });
            }

            let userState = await UserState.findOne({ userId });

            if (!userState) {
                  userState = new UserState({ userId });
            }

            userState.currentModuleId = moduleId;
            userState.currentQuestionId = module.entryQuestionId;

            await userState.save();

            res.json({
                  message: "Module started successfully",
                  currentQuestionId: module.entryQuestionId,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
exports.getCurrentQuestion = async (req, res) => {
      try {
            const { userId } = req.params;

            const userState = await UserState.findOne({ userId });

            if (!userState) {
                  return res.status(404).json({
                        message: "User state not found",
                  });
            }

            const question = await Question.findById(
                  userState.currentQuestionId
            );

            res.json({
                  moduleId: userState.currentModuleId,
                  question,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
exports.answerQuestion = async (req, res) => {
      try {
            const { userId, questionId, optionId } = req.body;

            const userState = await UserState.findOne({ userId });

            if (!userState) {
                  return res.status(404).json({ message: "User not found" });
            }

            // Validate current question
            if (userState.currentQuestionId.toString() !== questionId) {
                  return res.status(400).json({
                        message: "Invalid question. Not user's current question.",
                  });
            }

            const question = await Question.findById(questionId);

            if (!question) {
                  return res.status(404).json({ message: "Question not found" });
            }

            const option = question.options.id(optionId);

            if (!option) {
                  return res.status(400).json({ message: "Invalid option selected" });
            }

            // Save conversation history
            await ConversationHistory.create({
                  userId,
                  moduleId: userState.currentModuleId,
                  questionId,
                  selectedOptionId: optionId,
            });

            // Handle checkpoint
            if (question.isCheckpoint) {
                  userState.moduleContexts.delete(
                        userState.currentModuleId.toString()
                  );
            }

            // Determine next step
            let nextQuestionId = null;
            let nextModuleId = null;

            if (option.nextModuleId) {
                  nextModuleId = option.nextModuleId;

                  const nextModule = await Module.findById(nextModuleId);

                  if (!nextModule || !nextModule.entryQuestionId) {
                        return res.status(500).json({
                              message: "Next module invalid or missing entry question",
                        });
                  }

                  userState.currentModuleId = nextModuleId;
                  nextQuestionId = nextModule.entryQuestionId;

            } else if (option.nextQuestionId) {
                  nextQuestionId = option.nextQuestionId;

            } else {
                  return res.status(400).json({
                        message: "Option does not lead anywhere",
                  });
            }

            userState.currentQuestionId = nextQuestionId;
            await userState.save();

            const nextQuestion = await Question.findById(nextQuestionId);

            res.json({
                  message: "Answer recorded successfully",
                  nextQuestion,
            });

      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
exports.handleDeepLink = async (req, res) => {
      try {
            const { questionId } = req.params;
            const { userId } = req.query;

            if (!userId) {
                  return res.status(400).json({
                        message: "userId is required in query params",
                  });
            }

            const userState = await UserState.findOne({ userId });

            if (!userState) {
                  return res.status(404).json({
                        message: "User state not found",
                  });
            }

            // If deep link matches current question → allow
            if (userState.currentQuestionId.toString() === questionId) {
                  const question = await Question.findById(questionId);

                  return res.json({
                        message: "Deep link valid",
                        question,
                  });
            }

            // If deep link is outdated → return current question
            const currentQuestion = await Question.findById(
                  userState.currentQuestionId
            );

            return res.json({
                  message: "Deep link invalid. Returning current valid question.",
                  question: currentQuestion,
            });

      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
