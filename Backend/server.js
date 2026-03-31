require("dotenv").config()
const connectDB = require("./src/config/db")
const app = require('./src/app')




const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed", error);
    }
};

startServer();