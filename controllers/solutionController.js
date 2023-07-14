require('dotenv').config()
const { StatusCodes } = require("http-status-codes");
const Question = require("../models/Question");
const User = require("../models/User");
const CustomError = require("../errors");
const sendResultMail = require("../utils/sendResultMail");
const { submission, getResult } = require("../utils/sphere-api-calls");

// sphere api access token and endpoint
const compilerAccessToken = process.env.COMPILER_ACCESS_TOKEN;
const compilerEndPoint = process.env.COMPILER_END_POINT


const evaluateSolution = async (req, res) => {
  const { problemId: problemId } = req.body;

  const isValidQuestion = await Question.findOne({ problemId: problemId });
  // if given problemId question exist in db
  if (!isValidQuestion) {
    throw new CustomError.NotFoundError(`No question with id: ${problemId}`);
  }

  const response = await submission(
    compilerEndPoint,
    compilerAccessToken,
    req.body
  );

  let items;
  let result;
  // wait for 2 seconds after getting response of submission
  // if still response status is running then agai wait for 2 seconds till status becomes not running
  while (true) {
    items = await getResult(compilerEndPoint, compilerAccessToken, response.id);

    result = items[0].result.status.name;
    if (result != "running...") {
      break;
    }
    // wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const user = await User.findOne({ _id: req.user.userId });
  await sendResultMail({
    name: user.name,
    email: user.email,
    questionTitle: isValidQuestion.name,
    result: result,
  });
  res.status(StatusCodes.CREATED).json({ msg: `Solution is ${result}` });
};



module.exports = {
  evaluateSolution
};
