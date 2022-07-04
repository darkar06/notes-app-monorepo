const URL = {
  get: "/app",
  post: "/app/post",
  put: "/app/put",
  login: "/app/login"
}

let token = null
export const setToken = (newToken)=>{
  token = `bearer ${newToken}`
}

export const getNotes = ()=>{
  return fetch(URL["get"])
    .then(res=> res.json())
}

export const changeNotes = ({title, content})=>{
  return fetch(URL["post"], {
    method: "POST",
    body:JSON.stringify({
      title,
      content
    }),
    headers: {
      "Authorization" : `${token}`,
      "Content-type": "application/json"
    }
  })
    .then(res=> res.json())
}

export const updateNote = ({title, content, important},id)=>{
  return fetch(URL["put"] + "/" + id, {
    method: "PUT",
    body:JSON.stringify({
      title,
      content,
      important
    }),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(res=> res.json())
}

export const login = ({userName, password})=>{
  return fetch(URL["login"], {
    method: "POST",
    body:JSON.stringify({
      userName,
      password
    }),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(res=> res.json())
}