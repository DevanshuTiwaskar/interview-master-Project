const express = require("express")
const authMiddleware =  require('../middleware/auth.middleware')
const interviewRouter = express.Router()
const interviewController =  require("../controllers/interview.controller")
const upload = require('../middleware/file.middleware')

/**
 * @route POST/api/interview
 * @description generate new interview report on this basic of user self descrition,resume pdf, job descrition
 * @access private
 */
interviewRouter.post('/',authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewController)


module.exports = interviewRouter