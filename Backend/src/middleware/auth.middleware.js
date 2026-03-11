const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blackList.model")





async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "token is not provide"})
    }

    const isBlackListed = await tokenBlackListModel.findOne({token})

    if(isBlackListed){
        return res.status(401).json({message: "token is invalid"})
    }

    try {
       const decoded =   jwt.verify(token,process.env.JWT_SECRET)
       req.user = decoded // create new property in request object to store decoded token data and make it available in the next middlewares and controllers
       next()

    } catch (error) {
        return res.status(401).json({message: "Invalid token"})
    }
}

module.exports = {authUser}