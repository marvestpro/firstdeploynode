const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")

const userschma = mongoose.Schema({
    firstname:{type:String, required: true},
    lastname:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true},
    profileimage: { type: String},

},{timestamps:true})

// let saltround = 10
// userschma.pre("save", function(next){
//     console.log(this, "line 11");


//     bycrypt.hash(this.password , saltround).then((password)=>{
//         console.log(password);
//         this.password = password
//         next()
//     }).catch((err)=>{
//         console.log(err);
//     })
// })


const usermodel = mongoose.model("fullstack_collection", userschma)


module.exports = usermodel



