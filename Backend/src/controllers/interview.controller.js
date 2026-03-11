const pdfparse = require("pdf-parse")
const generateInterviewReport = require('../services/ai.service')
const interViewReportModel = require("../models/interviewReport.model")


async function generateInterviewController(req,res) {

    const resumeContent = await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {jobDescription, selfDescription} = req.body


   const interViewReportByAi = await  generateInterviewReport({
    resume: resumeContent,
    jobDescription,
    selfDescription
   })

   
    const interviewReport = await interViewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi

    })

    res.status(201).json({
        message:"Interview report generated successfull",
        interviewReport
    })



}



module.exports = {
    generateInterviewController
}