import { useState,useRef } from "react"
import Togable from "./Togable"
import React from "react"
import propTypes from "prop-types"

export default function RenderCreateNoteForm ({createNote,logout}) {
  const [value, setValue] = useState("")
  const togableRef = useRef()

  const changeContent = (e) => {
    setValue(e.target.value)
  }

  const changeSubmit = (e)=>{
    e.preventDefault()
    let newValue = {
      title: "task",
      content: value
    }

    createNote(newValue)
    setValue("")
    togableRef.current.changeVisibility()
  }


  return (
    <div>
      <Togable ref={togableRef} label={"create a note"}>
        <h1 >Create a note</h1>
        <form onSubmit={changeSubmit}>
          <input 
            onChange={changeContent} 
            type="text" 
            placeholder="create a note" 
            value={value} 
          />
          <button> cambiar</button>
        </form>
        

      </Togable>
      <div>
        <button onClick={logout}>log out</button>
      </div>
    </div>
  )
}

RenderCreateNoteForm.propTypes = {
  createNote: propTypes.func,
  logout: propTypes.func
}