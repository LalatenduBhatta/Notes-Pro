const mongoose=require("mongoose")
const userSchema = require("../schema/schema")


const user=mongoose.model("users",userSchema)

module.exports=user