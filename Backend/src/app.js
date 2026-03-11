const express = require("express")
const authRouter = require("./routes/auth.router")
const interviewRouter = require("./routes/interview.router")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

//authRouters
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)





module.exports = app