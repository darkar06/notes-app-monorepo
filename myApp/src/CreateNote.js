export default function CreateNote ({id,important,title,content,changeImportant}) {
  const label = important ? "make not important" : "make important"

  return (
    < li >
    {
      important
      ?<h3>{title}</h3>
      :<strike><h3>{title}</h3></strike>
    }
      <p>{content}</p>
      <button onClick={()=> changeImportant()}>{label}</button>
    </li>
  )
}