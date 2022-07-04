const mongoose = require("mongoose")
const Note = require("../models/note");
const {notes, api,server, getAllNotes } = require("./helpers/helpers")


jest.setTimeout(10000) 
beforeAll(async()=>{
    console.log(process.env.PORT)
    await Note.deleteMany({})
    for (let note of notes) {
        let nota = new Note (note)
        nota.save()
    }
})

// gets

test("notes returned all jsons",  async()=>{
   await  api.get("/app")
   .expect(200)
   .expect("content-type", /application\/json/)
})

test("database have 2 notes",async()=>{
    const {contents, body} = await getAllNotes()
    expect(body).toHaveLength(notes.length)
    expect(contents).toContain(notes[0].content)
})

test("first note have this",async()=>{ 
    const {contents} = await getAllNotes()
    expect(contents).toContain("hola")
})

test("find one note",async()=>{
    const {body} = await getAllNotes()
    const res = await api.get("/app/" + body[0].id)
    expect( res.body).toStrictEqual(body[0])
})

test("find one note that db not have",async()=>{
    const {body} = await getAllNotes()
    const res = await api.get("/app/asdasd")
    .expect(400)
})

// post

test("post create a note", async()=>{
    const note = {
        content: "hos",
        title : "new post"
    }
    await api.post("/app/post")
    .send(note)
    .expect(201)
    .expect("content-type", /application\/json/)

    const {contents,body} = await getAllNotes()
    expect(contents).toContain(note.content)
    expect(body).toHaveLength(notes.length + 1)

})

test("post get a undefined content",async()=>{
    const note = {
        title : "neeww post"
    }
    await api.post("/app/post")
    .send(note)
    .expect(404)

    const {body} = await getAllNotes()
    expect(body).toHaveLength(notes.length +1 )
})

test("post get a undefined title",async()=>{
    const note = {
        content : "neeww post"
    }
    await api.post("/app/post")
    .send(note)
    .expect(404)

    const {body} = await getAllNotes()
    expect(body).toHaveLength(notes.length +1 )
})

//delete

test("note is deleted",async()=>{
    let {body} = await getAllNotes()
    const res = await api.delete("/app/delete/" + body[0].id)
    .expect(204)
    const newPeticion = await api.get("/app")
    expect(newPeticion.body).toHaveLength(notes.length)
})

test("note cant deleted for malform id",async()=>{
    const res = await api.delete("/app/delete/asas")
    .expect(400)
    const {body} = await getAllNotes()
    expect(body).toHaveLength(notes.length )
})

//put

test("change a note",async()=>{
    const {body} = await getAllNotes()
    const id = body[0].id;

    const newChange ={
        content: "ola wachin"
    }

    const res = await api.put("/app/put/" + id )
    .send(newChange)
    .expect(200)

    const newGet = await api.get("/app")
    const contents = newGet.body.map(res => res.content)
    expect(contents).toContain(newChange.content)
})

test("change a note with empty data",async()=>{
    const {body} = await getAllNotes()
    const id = body[0].id;

    const newChange ={}

    const res = await api.put("/app/put/" + id )
    .send(newChange)
    .expect(304)

    const newGet = await api.get("/app")
    const contents = newGet.body.map(res => res.content)
    expect(contents).toStrictEqual(contents)
})

test("change a note with malformed id",async()=>{

    const newChange ={
        content: "holasfdasfas",
        title: "lsid"
    }

    const res = await api.put("/app/put/asdasa")
    .send(newChange)
    .expect(400)

    const newGet = await api.get("/app")
    const contents = newGet.body.map(res => res.content)
    expect(contents).toStrictEqual(contents)
})


afterAll(async()=>{
    await mongoose.disconnect()
    server.close()
})