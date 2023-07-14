const express = require("express");

const router = express.Router();

const {evaluateSolution} = require("../controllers/solutionController");

router.route("/").post(evaluateSolution)

module.exports = router;
