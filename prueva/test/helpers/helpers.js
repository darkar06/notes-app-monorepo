const supertest = require("supertest")
const {app,server}= require("../../index")

const notes = [
    {
        "content": "hola23",
        "title": "note44"
    },{
        "content": "hola",
        "title": "note2"
    }
]

const users = [
    {
        "userName": "Dark",
        "name": "Ramses",
        "passwordHash": "123456"
    },    {
        "userName": "Darkar",
        "name": "Pablo",
        "passwordHash": "123wr456"
    },    {
        "userName": "ASD",
        "name": "Rasdsmses",
        "passwordHash": "1234dw56"
    }
]

async function getAllUsers (){
    const res = await api.get("/app/user/find");
    const {body} = res;
    const newBody = body
    const userNames = newBody.map(res=> res.userName)
    return{
        newBody,
        userNames
    }
}


const api = supertest(app)

async function getAllNotes (){
    const res = await api.get("/app")
    const {body} = res
    const contents = body.map(res => res.content)
    return {body, contents}
}

module.exports = {
    notes,
    api,
    server,
    getAllNotes,
    getAllUsers,
    users
}