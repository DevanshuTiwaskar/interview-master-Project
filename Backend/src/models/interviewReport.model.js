const mongoose = require('mongoose')


/**
 * -Job description : String
 * -Self description : String  (optional)
 * -matchScore : Number  (option)
 * 
 * self description and matchscore user can give any one of this 
 *  
 * 
 * -Technical question: 
 *         [{
 *          question: "",
 *          intention: "",
 *          answer: "",
 *          }]
 * -behaviaral question:
 *          [{
 *          question: "",
 *          intention: "",
 *          answer: "",
 *          }]
 * -skill gaps: 
 *        [{
 *          skill: "",
 *          severity: {
 *                      type:String ,
 *                      enum:["low","medium","high"]  
 *                   },
 *         }]
 * -preparation plan:
 *          [{
 *              day: Numberm,
 *              facus: String,
 *               task: [String]
 *           }]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, " Technical question is required"]
    },
    
    intention: {
        type: String,
        required: [true, " Intention is required"]
    },
    
    answer: {
        type: String,
        required: [true, " Answer is required"]
    }
},{
    _id: false
})

const behaviaralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, " Technical question is required"]
    },
    
    intention: {
        type: String,
        required: [true, " Intention is required"]
    },
    
    answer: {
        type: String,
        required: [true, " Answer is required"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [true,"Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low","medium","high"],
        required: [true,"Severity is required"]
    }
},{
    _id: true
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true,'Day is required']
    },
    focus:{
        type:String,
        required: [true,"Focus is required"]
    },
    task:[{
        type: String,
        required: [true, "Task is required"]
    }]
},{
    _id: true
})

const interViewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job Description is required"]
    },

    resume: {
        type: String
    },

    selfDescription: {
        type:String
    },
    matchScore: {
        type: Number,
        min: 0,
        max:100,
    },
    technicalQuestion: [technicalQuestionSchema],
    behaviaralQuestion: [behaviaralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{
    timestamps: true
})

const interViewReportModel = mongoose.model("InterviewReport",interViewReportSchema)

module.exports = interViewReportModel