const {average} = require("../utils/fortesting.js");

describe("average",()=>{
    test("average de 7",()=>{
        expect(average([1,2,3,4,5,6,7])).toBe(4)
    })
})

test("average get a string values",()=>{
    expect( average(["1","2","3","4","5","6","7"]) ).toBe(4)
})