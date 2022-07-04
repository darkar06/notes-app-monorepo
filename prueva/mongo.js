const password = require("./password")
const mongoose = require("mongoose")

const {NODE_ENV,MONGO_URL,MONGO_TEST_URL} = process.env

const conectionString = NODE_ENV === "test"? MONGO_TEST_URL :MONGO_URL

//conexion a mongo db

mongoose.connect(conectionString,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
 })
.then(()=>{
    console.log("database conected")
}).catch(err =>{
    console.error(err)
})

/*

const note = new Note({
    title : "hola juan",
    content: "esta es una nota",
    important: Math.random() > 5 ? true : false
})

note.save()
.then(res => {
    console.log(res)
    mongoose.connection.close()
}).catch( err =>{
    console.log(err)
})*/