require('dotenv').config()
const Question = require("../models/Question");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const {
  getProblem,
  addProblem,
  updateProblem,
  deleteProblem,
} = require("../utils/sphere-api-calls");

// sphere api access token and endpoint
const problemAccessToken = process.env.PROBLEM_ACCESS_TOKEN;
const problemEndPoint = process.env.PROBLEM_END_POINT;

// both admin and participants can see
const getAllQuestions = async (req, res) => {
  let result = Question.find({}).sort("createdAt");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //23 items total
  // 4 pages
  // 7 7 7 2
  const questions = await result;
  res.status(StatusCodes.OK).send({ questions, count: questions.length });
};

// both admin and participants can see
const getQuestion = async (req, res) => {
  // take out the id from req.params and put into QuestionId
  const {
    params: { id: problemId },
  } = req;
  const question = await Question.findOne({ problemId: problemId });
  if (!question) {
    throw new NotFoundError(`No Question with id ${problemId}`);
  }
  const response = await getProblem(
    problemEndPoint,
    problemAccessToken,
    problemId
  );
  res.status(StatusCodes.OK).json({ response });
};

// only admin has access to do
// not storing everything in db related to the question
// at the end fetching question from the sphere which we submitted
// used db just to store our questions so that we can our questions only
const addQuestion = async (req, res) => {
  const response = await addProblem(
    problemEndPoint,
    problemAccessToken,
    req.body
  );
  req.body.problemId = response.id;
  const question = await Question.create(req.body);
  res.status(StatusCodes.CREATED).json({ question });
};

// only admin has access to do
const updateQuestion = async (req, res) => {
  const {
    params: { id: problemId },
  } = req;
  await updateProblem(
    problemEndPoint,
    problemAccessToken,
    problemId,
    req.body
  );
  const question = await Question.findOneAndUpdate(
    { problemId: problemId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  
  if (!question) {
    throw new NotFoundError(`No Question with id ${problemId}`);
  }
  res.status(StatusCodes.OK).json({ question });
};

// only admin has access to do
const deleteQuestion = async (req, res) => {
  const {
    params: { id: problemId },
  } = req;
  await deleteProblem(
    problemEndPoint,
    problemAccessToken,
    problemId,
  );

  const question = await Question.findOneAndDelete({
    problemId: problemId,
  });
  if (!question) {
    throw new NotFoundError(`No Question with id ${problemId}`);
  }
  await question.deleteOne();
  res.status(StatusCodes.OK).json({ msg: `Problem deleted Successfully` });
};

module.exports = {
  getAllQuestions,
  getQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
