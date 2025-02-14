const mongoose=require("mongoose")

const schema=mongoose.Schema
const user1schema=new schema({
    username:String,
    email:String,
    number:Number,
    age:Number,
    password:String
})

module.exports=user1schema