const malformedId = (err,req,res,next)=>{
    console.log(err.name)

    if( err.name === "CastError"){
        res.status(400).send({error: "la id espesificada no fue encontrada"}).end()
    }

    else if (err.name === "body empty"){
        res.status(304).send({error: "el contenido de la request esta vacio"}).end()
    }

    else if (err.name === "user found"){
        res.status(406).send({error: "ya existe un usuario con ese user name"}).end()
    } else if (err.name === "JsonWebTokenError"){
        res.status(401).send({error: "token perdido o invalido"})
    }

    else{
        res.status(500).end()
    }
}


const endpointNotFound = (req,res)=>{
    res.status(404).json({"error": 404})
}

module.exports = {
    endpointNotFound,
    malformedId
}