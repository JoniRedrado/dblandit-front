import { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

const CreateCourse = () => {

  const [input, setInput] = useState({
    subject: "",
    duration: "",
    year: ""
  })

  const token = localStorage.getItem("token")
  if(!token){
    return(
      <Navigate to='/login'/>
    )
  }

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/api/courses', {headers:{'token': token}, body: input})
      .then(res=>{
        console.log(res)
      })
      .catch(error=>{
        console.log(error);
      })
      setInput({
        subject: "",
        duration: "",
        year: ""
      })
    }

    if(!token){
      return(
        <Navigate to='/login'/>
      )
    }

  return (
    <main>
      
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <h2>Ingrese los datos del curso que desea agregar</h2>
      <form onSubmit={handleSubmit}>
        <label >Tema: </label>
        <input type="text" onChange={handleChange} name="subject" value={input.subject}/>
        <label >Duración en meses: </label>
        <input type="number" onChange={handleChange} name="duration" value={input.duration}/>
        <label >Año que se dictó:</label>
        <input type="number" onChange={handleChange} name="year" value={input.year}/>
        <button type="submit">Agregar Curso</button>
      </form>
    </main>
  )
}

export default CreateCourse