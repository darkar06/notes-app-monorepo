import "./App.css"
import React from "react"

function HelloWorld({mytext}){
  return(
    <div>{mytext}</div>
  )
}
   
const notas = [
  {
    id:1,
    content: "la tarea 1",
    date: "12/12/12",
    immportant: true
  },{
    id:2,
    content: "la tarea 2",
    date: "14/15/127",
    immportant: true
  },{
    id:3,
    content: "la tarea 3",
    date: "14/12/42",
    immportant: true
  },
]

const App = ()=>{
  return (
    <div className="App">
      {notes}
    </div>
  )
}

export default App
