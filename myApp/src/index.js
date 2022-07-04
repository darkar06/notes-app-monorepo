import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import {Notes as Juan} from "./notes.js"


const App = ()=>{
  return (
    <div className="App">
      <Juan />
    </div>


  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
