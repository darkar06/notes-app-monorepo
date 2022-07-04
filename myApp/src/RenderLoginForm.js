import Togable from "./Togable"
import {useState} from "react"
import React from "react"
import propTypes from "prop-types"

export default function RenderLogin ({handleSub}){
    
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
    handleSub(userName, password)

    setUserName("")
    setPassword("")
  }

  return (
    <Togable label={"login"}>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="username"
          value={userName}
          onChange={({target})=> setUserName(target.value)}/>
        <input type="password"
          placeholder="password"
          value={password}
          onChange={({target})=> setPassword(target.value)}/>
        <button>enviar</button>
      </form>
    </Togable>
  )
}

RenderLogin.propTypes = {
  handleSub: propTypes.func
}