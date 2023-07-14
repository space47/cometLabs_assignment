const express = require("express");

const router = express.Router();

const {
    addTestCase,
    getQuestionTestCases
} = require("../controllers/questionTestCaseController");

router.route("/:id").post(addTestCase).get(getQuestionTestCases);

module.exports = router;
