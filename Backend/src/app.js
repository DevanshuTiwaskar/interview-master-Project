const express = require("express")
const authRouter = require("./routes/auth.router")
const app = express()
const cookieParser = require("cookie-parser")


app.use(express.json())
app.use(cookieParser())


//authRouters
app.use("/api/auth",authRouter)





module.exports = app