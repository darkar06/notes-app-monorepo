import "@testing-library/jest-dom/extend-expect"
import {render, fireEvent} from "@testing-library/react"
import Togable from "./Togable"

describe("<Togable/>",()=>{
    let component;
    beforeAll(()=>{
        component = render(<Togable label={"show"} >
            <div>
                hola
            </div>
        </Togable>)
    })

    test("togable have a style",()=>{
        const button = component.getByText("show")
        const content = component.getByText("hola")

        expect(button.parentNode).toHaveStyle("display: block")
        expect(content.parentNode).toHaveStyle("display: none")

        fireEvent.click(button)

        expect(content.parentNode).toHaveStyle("display: block")
        expect(button.parentNode).toHaveStyle("display: none")
    })
})