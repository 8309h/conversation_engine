const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
      label: {
            type: String,
            required: true,
      },

      nextQuestionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
      },

      nextModuleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
      },
});

const questionSchema = new mongoose.Schema(
      {
            moduleId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Module",
                  required: true,
            },

            text: {
                  type: String,
                  required: true,
            },

            options: [optionSchema],

            isCheckpoint: {
                  type: Boolean,
                  default: false,
            },
      },
      { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
