require("dotenv").config()
const connectDB = require("./src/config/db")
const app = require('./src/app')
const invokeGeminiAi = require("./src/services/ai.service")


invokeGeminiAi()

connectDB()

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})