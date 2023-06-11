import { Button, Link } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'

const CourseDetail = () => {

  const token = localStorage.getItem("token")

  const [courseDetails, setCourseDetails] = useState({})
  let {subject} = useParams()
  let isLoading = false

  useEffect(()=>{
    isLoading = true
    axios(`http://localhost:3000/api/courses/detail?subject=${subject}`,  {headers:{'token': token}})
      .then((data)=>{
        setCourseDetails(data.data)
      })
      .catch(error=>{
        alert("No se pudo obtener el curso...", error)
      })
    isLoading = false
  },[])
  const [bestStudent, setBestStudent]=useState({})
  const getBest =()=>{
    axios(`http://localhost:3000/api/students/outstanding?subject=${courseDetails.subject}`, {headers:{'token': token}})
    .then((data)=>{
      console.log(data);
      setBestStudent(data.data)
    })
    .catch(error=>{
      console.log(error);
    })
  }



  if (isLoading) {
    return <h3>Cargando</h3>
  }
  console.log(courseDetails.students)
  return (
    <div>
      {!token && <Navigate to='/login'/>}
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      {courseDetails.students ? <div>
        <h3>Tema: {courseDetails.subject}</h3>
        <p>Duracion: {courseDetails.duration} meses.</p>
        <p>Año en que se dictó: {courseDetails.year}</p>
        <div>
          {courseDetails.students.map((student)=>{
            return (<ul key={student.documentNumber}>
              <li>Nombre: {student.name}</li>
              <li>Apellido: {student.surname}</li>
              <li>Dirección: {student.adress}</li>
              <li>N° de documento: {student.documentNumber}</li>
              <li>Nota final: {student.grade}</li>
            </ul>)
          })}
        </div>
        <Link href={`/students/${courseDetails.subject}`}>Editar alumnos</Link>
        <Button onClick={getBest}>Obtener alumno destacado</Button>
        {bestStudent.name ? <h4>El alumno destacado es: {bestStudent.name}</h4> : <></>}
      </div> : <h2>Loading...</h2>}
    </div>
  )
}

export default CourseDetail