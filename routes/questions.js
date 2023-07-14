const express = require('express')
const router = express.Router()
const {authenticateUser, authorizePermission} = require('../middleware/authenticated');

const {  
    getAllQuestions,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionsController')

router.route('/').post(authenticateUser, authorizePermission('admin'),addQuestion).get(getAllQuestions)
router.route('/:id').get(getQuestion).delete(authenticateUser, authorizePermission('admin'),deleteQuestion).patch(authenticateUser, authorizePermission('admin'),updateQuestion)

module.exports = router