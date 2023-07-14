const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    problemId: {
      type: Number,
      requrierd: [true, 'Please provide problemId']
    },
    name: {
      type: String,
      required: [true, "Please provide question name"],
      maxlength: 50,
    },
    body: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 200,
    },
    masterjudgeId: {
      type: Number,
      requrierd: [true, "Please provide question level"],
    },
    interactive: {
      type: Boolean,
      default: false
    },
    typeId: {
      type: Number,      
      requrierd: [true, "Please provide question type"],
      enum: [0, 1, 2,3],
      default: 0
    }
  },
  { timestamps: true }
);



module.exports = mongoose.model("Questions", QuestionSchema);
