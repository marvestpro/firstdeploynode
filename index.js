const express = require("express")
const app = express()
const mongoose = require("mongoose") //mongoose is use toconnect our non-relational database which is our Mongodb database
require("dotenv").config() //.config is use to setup our dotenv
const userrouter = require("./Route/userrouter")

const cors = require("cors") // C.O.R.S - Cross Origin Resource, Is use to connect backend to frontend 


app.use(cors({origin:"*"})) //{origin:"*"} -- is use to connect to any frontend(origin)
app.use(express.urlencoded({extended:true})) // it is use to handle our form and make it accessible to req.body
app.use(express.json({extended:true, limit :"50mb"}))
app.use("/user", userrouter)



   const connect = () =>{
    try {
        const connection = mongoose.connect(process.env.URI) //(process.env.URI) to access our URI inside .env
        if (connection) {
            console.log("connected to a database");
        }
    } catch (error) {
        console.log(error);
    }
   }

   connect()
   
    const port = process.env.PORT
app.listen(port,()=>{
    console.log(`app begins ${port}`);
})
