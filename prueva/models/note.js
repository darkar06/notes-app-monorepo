const {Schema, model} = require("mongoose")

const newSchema = new Schema({
    title: String,
    content: String,
    important: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Note = model("Note", newSchema)

newSchema.set("toJSON",{
    transform : (document, returnedObject) =>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = Note;