require('dotenv').config()
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Question = require("../models/Question");
const {
  addTestCases,
  getTestCases
} = require("../utils/sphere-api-calls");



const problemAccessToken = process.env.PROBLEM_ACCESS_TOKEN;
const problemEndPoint = process.env.PROBLEM_END_POINT;

// only admin has access to do
const addTestCase = async (req, res) => {
  const { id: problemId } = req.params;
  const isValidQuestion = await Question.findOne({ problemId: problemId });
  // if given questionId question exist in db
  if (!isValidQuestion) {
    throw new CustomError.NotFoundError(`No question with id: ${problemId}`);
  
  }
  const response = await addTestCases(
    problemEndPoint,
    problemAccessToken,
    problemId,
    req.body
  );
  res.status(StatusCodes.CREATED).json({ msg: `Test Case added to problem: Test Case no- ${response.number}` });
};

const getQuestionTestCases = async(req,res) => {
  const { id: problemId } = req.params;
  const isValidQuestion = await Question.findOne({ problemId: problemId });
  // if given questionId question not exist in db
  if (!isValidQuestion) {
    throw new CustomError.NotFoundError(`No question with id: ${problemId}`);
  
  }
  const response = await getTestCases(
    problemEndPoint,
    problemAccessToken,
    problemId,
  );
  res.status(StatusCodes.OK).json({ response});
}

module.exports = {
  addTestCase,
  getQuestionTestCases
};
