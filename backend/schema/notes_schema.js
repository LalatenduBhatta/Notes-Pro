const mongoose=require("mongoose")

const schema=mongoose.Schema
const notesschema=new schema({
    title:String,
    content:String,
    subject:String,
    notesId:String
})

module.exports=notesschema