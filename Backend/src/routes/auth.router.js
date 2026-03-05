const { Router } = require("express") 
const authController = require("../controllers/auth.controler")
const authMiddleware = require("../me/auth.middleware")

const authRouter = Router()

// js doc commit
/**
 * @route POST /api/auth/registe
 * @description Register new user 
 * @access Public
 */


authRouter.post("/register",authController.registerUserController)



/**
 * @route POST /api/auth/login
 * @description Login user with email and password 
 * @access Public
 */

authRouter.post("/login",authController.loginUserController)

module.exports = authRouter


/**
 * @route GET /api/auth/logout
 * @description clear token  from user cookie and add token in blacklist to prevent user from using the same token again
 * @access public
 */


authRouter.get("/logout",authController.logoutUserController)



/**
 * @route GET /api/auth/get-me
 * @description get current logged in user data 
 * @access private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)