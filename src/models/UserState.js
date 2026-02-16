const mongoose = require("mongoose");

const userStateSchema = new mongoose.Schema(
      {
            userId: {
                  type: String,
                  required: true,
                  unique: true,
            },

            currentModuleId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Module",
            },

            currentQuestionId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Question",
            },

            moduleContexts: {
                  type: Map,
                  of: Object,
            },
      },
      { timestamps: true }
);

module.exports = mongoose.model("UserState", userStateSchema);
