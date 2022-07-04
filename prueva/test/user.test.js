const bcrypt = require("bcrypt")
const {api,server,users,getAllUsers} = require("./helpers/helpers");
const mongoose = require("mongoose");
const User = require("../models/user")

jest.setTimeout(10000)

describe("users", ()=>{
    
beforeAll(async ()=>{
    await User.deleteMany({})

    for(user of users){
        user.passwordHash = await bcrypt.hash(user.passwordHash,10)
        const u = new User(user)
        await u.save()
    }
})

test("find all users",async()=>{
    await api.get("/app/user/find")
    .expect(200)
    .expect("content-type", /application\/json/)
})

test("db have 3 users",async()=>{
    const {newBody,userNames} = await getAllUsers()
    expect(newBody).toHaveLength(users.length)
    expect(userNames).toContain(users[1].userName)
})

test("create a user",async ()=>{
    const user = {
        "userName": "juanwick",
        "name": "juan",
        "password": "juan034"
    }

    const res = await api.post("/app/user/create")
    .send(user)
    .expect(201)
    .expect("content-type", /application\/json/)

    const {body} = res;
    expect(body.userName).toStrictEqual(user.userName)

    const {userNames} = await getAllUsers()
    expect(userNames).toContain(user.userName)

    const newUsers = await User.find({})
    const jsonUsers = newUsers.map(res => res.toJSON())
    console.log(jsonUsers)
    expect(jsonUsers).toHaveLength(4)
})

test("if a user have a userName, created failed",async()=>{
    const oldUsers = await getAllUsers()
    const user = {
        "userName": "juanwick",
        "name": "juan",
        "password": "juan034"
    }

    const res = await api.post("/app/user/create")
    .send(user)
    .expect(406)
    .expect("content-type", /application\/json/)
    expect(res.body.error).toBe("ya existe un usuario con ese user name")

    const {newBody} = await getAllUsers()
    expect(newBody).toHaveLength(oldUsers.newBody.length)
})



afterAll(async ()=>{
    server.close()
    mongoose.connection.close()
})
})