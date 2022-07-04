const bcrypt = require("bcrypt")
const routers = require("express").Router()
const User = require("../models/user")

routers.get("/find",async (req,res)=>{
    const response = await User.find({}).populate("notes",{
        content:1,
        title:1,
    })
    res.json(response)
})

routers.post("/create",async(req,res,next)=>{
    const {body} = req;
    const {userName,name,password} = body;

    const users = await User.findOne({userName})
    if(users !== null) return next({name: "user found"})
    else{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password,saltRounds)

        console.log("asdasds")
    
        const user = new User({
            userName,
            name,
            passwordHash
        })
    
        try{
            const response = await user.save()
            console.log("asad")
            res.status(201).json(response)
        } catch(err){
            res.json(err)
        }
    }

   
})

module.exports = routers