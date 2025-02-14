const express=require("express")
const user = require("../model/model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const note = require("../model/noteModel")
const secret_key=process.env.SECRET_KEY || "kjdhkshusgcxbjh232123kjdfhskjf"

const router=express.Router()

//! Register the user

router.post("/register",async(req,res)=>{
    const {username,email,number,age,password}=req.body
    const  hashedpassword=await bcrypt.hash(password,10)
    const data=await user.findOne({email})
    // console.log(existUser);
    
    if(data){
        // console.log("User already exist");
        res.end("User already exist")
        
    }
    else{
        try {
            const result=await user.insertMany([{username,email,number,age,password:hashedpassword}])
            res.status(200).json({message:"User register successfully",result})
            // console.log(result);
            
        } catch (error) {
            res.send("Internal error")
        }
    }
})


//!Login User

router.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try {
       const data=await user.findOne({email})
       const checkPAss=await bcrypt.compare(password,data.password)
       
       if(data && checkPAss){
            const token=jwt.sign({user:data},secret_key,{expiresIn:"1hr"})
            res.status(200).json({message:"login Successfull",token,username:data.username})
       }
       else{
        res.json({message:"Login Failed",token:null})
       }
    } catch (error) {
        res.json({message:"Internal server Error",token:null})
    }
})
//!Middleware to check token
const verifytoken=(req,res,next)=>{
   const authHeader=req.headers["authorization"]
   const token=authHeader && authHeader.split(" ")[1];
    if(!token) return res.status(401).send({auth:false,message:"No token provided"})

        jwt.verify(token,secret_key,(err,decoded)=>{
            if (err) {
                res.status(500).send({auth:false,message:"Failed to authenticate token"})
            }
            else{
                req.user=decoded.user
            }
                // console.log(decoded.id);
                 next()
        })
}

//!Private Routes
// router.get("/checkme",verifytoken,async(req,res)=>{
//     const data=await user.find()
//     res.json(data)
// })


//! Create a Note
router.post("/create-note",verifytoken,async(req,res)=>{
    const currUser=req.user
    // console.log(currUser);
    
    const{title,content,subject}=req.body

    try {
        const result=await note.insertMany([{title,content,subject,notesId:currUser._id}])
        res.json({message:"Successfully notes added"})
    } catch (error) {
        res.json({message:"Failed to add notes"})
    }
})




//! Get the specific user notes
router.get("/get-notes",verifytoken,async(req,res)=>{
    const currUser=req.user
    if(currUser){
        try {
            const result=await note.find({notesId:currUser._id},{notesId:0})
            res.json({message:"Data fetched successfully",data:result})
        } catch (error) {
            res.status(501).json({message:"Failed to fetch data"})
        }
    }
    else{
        res.status(500).json({message:"Please login to see the notes"})
    }
})

//!Update the user notes
// router.put("/update-note/:id",verifytoken,async(req,res)=>{
//     let {title,content,subject}=req.body
//     let {id}=req.params
//     let currUser=req.user
//     try {
//         if(currUser){
//             const updateNote=await note.updateOne({_id:id},{$set:{title,content,subject}})
//             res.json({message:"Update note sucessfully",newNote:updateNote})
//         }
//     } catch (error) {
//         res.json({message:"Some error occurs"})
//     }
   
// })

router.put("/update-note/:id", verifytoken, async (req, res) => {
    const { title, content, subject } = req.body;
    const { id } = req.params;
    const currUser = req.user;

    try {
        // Check if the user is authorized
        if (!currUser) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        // Find the note first to ensure it exists
        const existingNote = await note.findOne({ _id: id });
        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Optionally, check if the current user owns the note
        if (existingNote.userId !== currUser.id) { // Assuming notes are tied to userId
            return res.status(403).json({ message: "Forbidden: You cannot update this note" });
        }

        // Perform the update
        const updatedNote = await note.findByIdAndUpdate(
            id,
            { $set: { title, content, subject } },
            { new: true } // Return the updated document
        );

        res.json({ message: "Update note successfully", newNote: updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "An error occurred while updating the note" });
    }
});



//!Delete the user notes
router.delete("/delete-note/:id",verifytoken,async(req,res)=>{
    const currUser=req.user
    const {id}=req.params
    try {
        if(currUser){
            console.log(currUser);
            
            const deleteNote=await note.deleteOne({_id:id})
            res.json({message:"Delete note suceesfully",delete_one:deleteNote})
        }
    } catch (error) {
        res.json({message:"Some error occurs"})
    }
})







//!Reset Password
router.put("/reset",async(req,res)=>{
    let {email,password,confirmpassword}=req.body
    const hashedpassword=await bcrypt.hash(password,10)
    const hashedconfirmpassword=await bcrypt.hash(confirmpassword,10)

    try {
        const data=await user.findOne({email})
        if(data.email==email && password==confirmpassword){
            try {
                const update_password=await user.updateOne({_id:data._id},{$set:{password:hashedconfirmpassword}})

                update_password? res.json({message:"User Updated Successfully"}):res.json("User Updation Failed")
            } catch (error) {
                res.json({message:"Internal server error 1"})
            }
        }
        else{
            res.json({message:"Email  doesn't exist"})
        }
    } catch (error) {
        res.json({message:"Internal server error 2"})
    }
})

module.exports=router