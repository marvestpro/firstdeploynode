const usermodel = require("../Model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const {useremail} = require("../utils/nodemailer")

const Signup = async(req, res)=>{
    try {
        console.log(req.body);
        const {firstname, lastname, email, password} = req.body 
        if (!firstname || !lastname || !email || !password) {
            res.status(400).send({message:"Input fields cannot be empty" , status: false})
        }else{
            const existuser = await usermodel.findOne({email : email})
            if (existuser) {
                res.status(402).send({message:"User already exist" , status: false})
            }else{
                const hashpassword = await bcrypt.hash(password, 10)
                console.log(bcrypt.hashpassword);
                
                const newuser = await usermodel.create({firstname, lastname, email, password:hashpassword})
                await useremail(email, firstname)
                if (newuser) {
                    return   res.status(200).send({message:"You have successfully signed up" , status: true})
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message , status: false})
    }
}

    const Login = async (req, res)=>{
        const {email, password} = req.body 
        if (!email || !password) {
            res.status(400).send({message:"input field cannot be empty", status:false})
        }else{
            try {
                const user = await usermodel.findOne({email:email})
                console.log(user);
                if (!user) {
                    res.status(402).send({message:"You are not a registered user; please sign up", status:false})
                }else{
                    const correctpassword = await bcrypt.compare(password, user.password)
                    if (!correctpassword) {
                    res.status(405).send({message:"Incorrect password", status:false})
                    }else{
                        const token = await jwt.sign({email}, "secretKey", {expiresIn:"10d"})
                        console.log(token);
                        res.status(200).send({message:"login successful", status:true, token})
                    }
                }
            } catch (error) {
                console.log(error);
                res.status(500).send({message:error.message, status:false})
            }
        }
    }

    const verifydashboard = async (req, res)=>{
        console.log(req.headers.authorization.split(" ")[1]);
        const token = req.headers.authorization.split(" ")[1]
        try {
            if (!token) {
                res.status(402).send({message:"Invalid token", status:false})
            }else{
                console.log(token);
                const verifytoken = await jwt.verify(token, "secretKey")


                console.log(verifytoken);
                const email = verifytoken.email
                const verifyuser = await usermodel.findOne({email})
                if (verifyuser) {
                    res.status(200).send({message:"user is verified", status:true})
                }
            }
        } catch (error) {
            if (error.message == "jwt malformed") {
                console.log("incorrect token");
                res.status(402).send({message:"incorrect token", status:false})
            }else{
                console.log(error);
                res.status(500).send({message:error.message, status:false})
            }
        }
    }

    const updateprofile = async(req, res)=>{
        console.log(req.body);
        console.log(req.headers);
        const {imagefile} =req.body
        const token = req.headers.authorization.split(" ")[1]
        if (!imagefile) {
          res.status(400).send({message: "image cannot be empty", status:false})
        }
        const verifytoken = jwt.verify(token, "secretKey")
        const email = verifytoken.email
        console.log(verifytoken);
        if (!verifytoken) {
          res.status(400).send({message: "invalid token", status:false})
        }
      
       const image = await  cloudinary.uploader.upload(imagefile)
        console.log(image.secure_url);
        const upload = await usermodel.findOneAndUpdate(
          {email},
          {profileimage: image.secure_url},
          {new:true}
        )
        console.log(upload);
        if (upload) {
          res.status(200).send({message: "Profile upload successful", status:true})
        }else{
          res.status(405).send({message: "Error occured while uploading profile", status:false})
        }
      }




module.exports = {Signup, Login, verifydashboard, updateprofile}


// const Signup = (req, res) =>{
//     res.send("Welcome to modularizarition")
// }





