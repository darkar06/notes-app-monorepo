const {palindorme} = require("../utils/fortesting.js");

test("palindrome de ramses",()=>{
    const result = palindorme("ramses");
    expect(result).toBe("sesmar")
})

test("palindrome with the empty string",()=>{
    const result = palindorme("");
    expect(result).toBe("")
})

test("palindrome is undefined",()=>{
    const result = palindorme();
    expect(result).toBeUndefined()
})

test("palindrome get a number",()=>{
    const result = palindorme(15);
    expect(result).toBe("51")
})
