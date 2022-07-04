const routes = require("express").Router();
const Note = require("../models/note")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

routes.get('/', async(req,response)=>{
    const notes = await Note.find({}).populate("userId",{
        userName: 1,
        name:1
    })
    response.json(notes)
})

routes.get('/:id', async(req,response,next)=>{
    const id = req.params.id;

    try{
        const note = await Note.findById( id)
        response.json(note)
    } catch(err){
       next(err)
    }
})

routes.delete('/delete/:id', async(req,response,next)=>{
    const id = req.params.id;
    try{
        const note = await Note.findByIdAndDelete( id);
        response.status(204).end()
    }catch(err){
        next(err) 
    }
})

routes.put('/put/:id', async(req,response,next)=>{
    const body = req.body;
    const id = req.params.id;

    if (!body.content && !body.title)return  next({name: "body empty"});

     const newNote = {
         content: body.content,
         title: body.title,
             important:body.important
     }

     try{
        const note = await Note.findByIdAndUpdate(id,newNote, {new: true})
        response.json(note)
     }catch (err){
         next(err)
     }
})

routes.post('/post',async(req,response,next)=>{
    const {content,title} = req.body;

    console.log("antes de")

    const authorization = req.get("Authorization")
    let token = "";

    console.log(authorization)

    if (authorization && authorization.toLowerCase().startsWith("bearer")){
       token =  authorization.substring(7)
       console.log("as")
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,process.env.SECRET)
    }catch(err){
        return next(err)
    }

    console.log(decodedToken)

    if(!token || !decodedToken.id) response.status(401).json({error: "token missing or invalid"});

    console.log(decodedToken.id)

    let user = {};

    try{
        user = await User.findById(decodedToken.id)
    }catch(err){
        return next(err)
    }

    if (!content)return  next()
    else if (!title)return  next()

    const newNote = new Note ({
        title,
        content,
        important: Math.random() > 0.5 ? true : false,
        userId: user._id
    })
    
    try{
        const saveNote = await newNote.save()
        user.notes = user.notes.concat(saveNote._id)
        await user.save()
        response.status(201).json(saveNote)
    }
    catch(err){
        next(err)
    }
})


module.exports = routes;