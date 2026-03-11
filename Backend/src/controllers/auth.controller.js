const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const bcrypt = require("bcrypt");
const tokenBlackListModel = require("../models/blackList.model");
/**
 * @name registerUserController
 * @description register New user, expects userName , email, and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide userName, email and password",
    });
  }

  const userAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      message: "Account already  exists with this email and userName ",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user is registered successfully ",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in request body
 * @access public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invaild email and password" });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(400).json({ message: "Invaild email and password" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: " user Login successfully ",

    user: {
      id: user._id,
      userName: user.username,
      email: user.email,
    },
  });
}



 /**
  * @route GET /api/auth/logout
  * @description clear token  from user cookie and add token in blacklist to prevent user from using the same token again
  * @access public
  */
async function logoutUserController(req,res){
   const token =  req.cookies.token


    if(token){
        await tokenBlackListModel.create({token})
    }


    res.clearCookie("token")

    res.status(200).json({message: "User logged out successfully "})

}


/**
 * @route GET /api/auth/get-me
 * @description get current logged in user data 
 * @access private
 */
async function getMeController(req,res){
 
    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message: "User data fetched successfully ",
        user: {
            id: user._id,
            userName: user.username,
            email: user.email,
        }
    })
}


module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
};
