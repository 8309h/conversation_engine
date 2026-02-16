const mongoose = require("mongoose");

const conversationHistorySchema = new mongoose.Schema(
      {
            userId: {
                  type: String,
                  required: true,
            },

            moduleId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Module",
            },

            questionId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Question",
            },

            selectedOptionId: {
                  type: mongoose.Schema.Types.ObjectId,
            },

            answeredAt: {
                  type: Date,
                  default: Date.now,
            },
      },
      { timestamps: true }
);

module.exports = mongoose.model(
      "ConversationHistory",
      conversationHistorySchema
);
