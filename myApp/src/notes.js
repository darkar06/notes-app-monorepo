import { useState, useEffect } from "react"
import { getNotes, changeNotes, updateNote, login, setToken } from "./fetchService.js"
import CreateNote from "./CreateNote.js"
import RenderCreateNoteForm from "./RenderCreateNoteForm"
import RenderLoginForm from "./RenderLoginForm"
import React from "react"

export const Notes = () => {
  const [notes, setNotes] = useState([])
  const [waiting, setWaiting] = useState(true)

  const [user, setUser] = useState(null)

  useEffect(() => {
    getNotes().then(res => {
      console.log(res)
      setWaiting(false)
      setNotes(res)
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("appUser")
    if (loggedUser !== "null") {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  const logout = () => {
    setToken(null)
    setUser(null)
    window.localStorage.removeItem("appUser")
  }



  const createNote = (newValue) => {

    console.log(user)


    const { token } = user
    setToken(token)
    changeNotes(newValue).then(res => {
      setNotes(notes.concat(res))
      console.log(res)
    })


  }

  const changeImportant = (id,important,title,content)=>{
    const updateMessage = {
      important: !important,
      title,
      content
    }

    updateNote(updateMessage,id).then(resUpdate=>{
      setNotes(notes.map(res=> res.id === id ? resUpdate : res ))
    }).catch(err =>{
      console.log(err)
    })
  }

  const handleSub = (userName, password) => {
    login({ userName, password }).then(res => {
      setUser(res)

      window.localStorage.setItem("appUser", JSON.stringify(res))
    }).catch(err => console.log(err))
    console.log("logueado")
  }

  if (waiting) return <h1>cargando...</h1>

  return (

    <div>
      <h1>notes</h1>

      {
        user
          ? <RenderCreateNoteForm
            createNote={createNote}
            logout={logout}
          />
          : <RenderLoginForm
            handleSub={handleSub}
          />
      }

      <ol>
        {notes.map(({content, title, important,id }) => <CreateNote
          key={id}
          id={id}
          content={content} 
          title={title} 
          important={important}
          changeImportant={changeImportant} />)}
      </ol>
    </div>
  )
}


