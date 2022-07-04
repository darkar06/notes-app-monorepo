const palindorme = (string)=>{
    if (typeof string === "undefined") return undefined;
    else if (typeof string === "number") string = string.toString()
    const nuevo = string.split("").reverse().join("");
    return nuevo;
}

const average = array =>{
    array = array.map(num =>{
        if (typeof num === "string") return parseInt(num)
        return num
    })
    let suma = 0;
    array.forEach(num => suma += num)
    return suma / array.length
}

module.exports = {palindorme,average}