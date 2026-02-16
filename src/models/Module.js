const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
      {
            name: {
                  type: String,
                  required: true,
            },

            description: {
                  type: String,
            },

            entryQuestionId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Question",
            },

            isActive: {
                  type: Boolean,
                  default: true,
            },
      },
      { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);







