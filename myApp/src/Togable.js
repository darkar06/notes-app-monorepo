import { useState,useImperativeHandle, forwardRef} from "react"
import React from "react"



const Togable = forwardRef(({children, label},ref) =>{
  Togable.displayName = "Togable"
      const [visible,setVisible] = useState(false)

  const showVisibility = {display: visible ? "block" : "none"}
  const hiddenVisibility = {display: visible ?  "none": "block"}

  const changeVisibility = ()=> setVisible(!visible)
  useImperativeHandle(ref, ()=>{
    return{
      changeVisibility
    }
  })

  return(
    <div>
      <div style={hiddenVisibility}>
        <button onClick={changeVisibility}>{label}</button>
      </div>

      <div style={showVisibility}>
        {children}
        <button onClick={changeVisibility}>
          cancel
        </button>
      </div>

    </div>
  )
})



export default Togable