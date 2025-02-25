const mongoose=require("mongoose")
const notesschema = require("../schema/notes_schema")



const note=mongoose.model("note",notesschema)

module.exports=note