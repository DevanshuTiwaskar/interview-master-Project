import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


/**
 * @description service to generate interview report on the basis of user self description,resume pdf and job description.
 */

export const generateInterviewReport = async({jobDescription , selfDescription, resumeFile }) => {
    

    const formdata = new FormData()
    formdata.append("jobDescription", jobDescription)
    formdata.append("selfDescription", selfDescription)
    formdata.append("resumeFile", resumeFile)


    const response  = await api.post("/api/interview/",formdata,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })


    return response.data
}

/***
 * @description service to get interview report by interviewId.
 */

export const getInterviewById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}


/**
 * @description service to get all interview report of logged user.
 * @returns array of interview report.
 * 
 */
export const getAllInterview = async() => {
    const response = await api.get('/api/interview/')

    return response.data
}
