import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CourseDetail = () => {

  const [courseDetails, setCourseDetails] = useState({})
  let {subject} = useParams()
  let isLoading = false

  useEffect(()=>{
    isLoading = true
    axios(`http://localhost:3000/api/courses/detail?subject=${subject}`)
      .then((data)=>{
        setCourseDetails(data.data)
      })
      .catch(error=>{
        alert("No se pudo obtener el curso...", error)
      })
    isLoading = false
  },[])

  if (isLoading) {
    return <h3>Cargando</h3>
  }
  console.log(courseDetails.students)
  return (
    <div>
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
      </div> : <h2>Loading...</h2>}
    </div>
  )
}

export default CourseDetail