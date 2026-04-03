const pdfParse = require("pdf-parse")
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    if (!interViewReportByAi || !interViewReportByAi.title) {
        return res.status(500).json({
            message: "Failed to generate interview report. Please try again."
        })
    }

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}


/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req,res){
   
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."

        })
    }


    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
}


/**
 * @description controller to get all interview report of logging user
 */
async function getAllInterviewReportController(req,res){
    const interviewReport = await interviewReportModel.find({user: req.user.id}).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -_v -techincalQuestions  -behavioralQuestions -skillGaps -preparationPlan")


    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportController
}