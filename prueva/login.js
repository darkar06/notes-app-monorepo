const User = require("./models/user")
const router = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/",async(req,res)=>{
    const {userName,password} = req.body;

    const user = await User.findOne({userName})
    const passwordIsCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash);

    if(!(user && passwordIsCorrect)){
        res.status(401).json({
            error: "username o contraceña invalido"
        })
    }else{

        console.log(user._id)

        const userToken = {
            name: user.name,
            id: user._id
        }
        
        const token = jwt.sign(userToken,process.env.SECRET)
        
        res.send({
            name: user.name,
            userName: user.userName,
            token
        })

    }



})

module.exports = router