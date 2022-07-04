import "@testing-library/jest-dom/extend-expect"
import {render,prettyDOM, fireEvent} from "@testing-library/react"
import CreateNote from "./CreateNote"

test("render a component", ()=>{
    const note = {
        id: "asd",
        title: "hola",
        content: "aqui esperando cositas",
        important :true
    }

    const mock = jest.fn()

    const component = render(<CreateNote 
    id={note.id} 
    content={note.content} 
    title={note.title} 
    important={note.important}
    changeImportant={mock} />)

    component.getByText("aqui esperando cositas")
    const button = component.getByText("make not important")

    fireEvent.click(button)

    expect(mock).toHaveBeenCalledTimes(1)
     

    // const li = component.container.querySelector("h3")
    // console.log(prettyDOM(li))
})