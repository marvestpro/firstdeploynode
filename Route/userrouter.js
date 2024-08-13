const express = require("express")
const router = express.Router()
const {uservalidation} = require('../Middlewares/uservalidation')
const {validate} = require('../Middlewares/Validation')
const {Signup, Login, verifydashboard, updateprofile} = require("../Controllers/userControllers")


router.post("/signup",validate(uservalidation), Signup)
router.post("/login", Login)
router.post("/verifytoken", verifydashboard)
router.post("/update", updateprofile)


// router.post("/lannd", Land)

// router.get("/signup" ,(req, res)=>{
//     // res.send("Welcome to authorization to my page")
// })


module.exports = router

