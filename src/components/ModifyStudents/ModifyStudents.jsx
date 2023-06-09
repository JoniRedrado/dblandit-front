import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ModifyStudents = () => {

  const [courseDetails, setCourseDetails] = useState({})
  const [documentNumber, setDocumentNumber] = useState("")
  const [newStudent, setNewStudent] = useState({
    name: "",
    surname: "",
    address: "",
    documentNumber: undefined,
    grade: "",
  })

  let {subject} = useParams()
  let isLoading = false


  //Eliminar alumno
  //Se puede hacer poniendo un boton para cada alumno
  const handleChange = (e)=>{
    setDocumentNumber(e.target.value)
  }

  const deleteStudent = (e)=>{
    e.preventDefault()
    axios.delete(`http://localhost:3000/api/students?subject=${subject}&documentNumber=${documentNumber}`)
      .then(res=>{
        console.log(res);
      })
      .catch(error=>{
        console.log(error);
      })
    setDocumentNumber("")
  }

  //Agregar alumno
  const handleNewStudent = (e)=>{
    if (e.target.name === "documentNumber" ||e.target.name === "grade"){
      const number = e.target.value
      setNewStudent({...newStudent, [e.target.name]: parseInt(number)})
    } else {
      setNewStudent({...newStudent, [e.target.name]: e.target.value})
    }
  }

  const addStudent = (e)=>{
    e.preventDefault()
    console.log(newStudent);

    axios.post('http://localhost:3000/api/students', {...newStudent, subject: courseDetails.subject})
      .then(res=>{
        console.log(res);
      })
      .catch(error=>{
        console.log(error);
      })
    setNewStudent({
      name: "",
      surname: "",
      address: "",
      documentNumber: "",
      grade: "",
    })
  }

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
  },[deleteStudent, addStudent])

  if (isLoading) {
    return <h3>Cargando</h3>
  }

  return (
    <div>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <h3>{courseDetails.subject}</h3>
      <ul>
        {courseDetails.students?.map((student)=>{
          return(
            <li key={student.documentNumber}>{student.name} {student.surname}</li>
          )
        })}
      </ul>
      <form onSubmit={deleteStudent}>
        <label>Ingrese el DNI del alumno a eliminar:</label>
        <input name='documentNumber' type='number' value={documentNumber} onChange={handleChange}/>
        <button type='submit'>Eliminar</button>
      </form>
      <hr />
      <form onSubmit={addStudent}>
        <label>Nombre: </label>
        <input type='text' name='name' value={newStudent.name} onChange={handleNewStudent}/>
        <label>Apellido: </label>
        <input type='text' name='surname' value={newStudent.surname} onChange={handleNewStudent}/>
        <label>Dirección:</label>
        <input type='text' name='address' value={newStudent.address} onChange={handleNewStudent}/>
        <label>Numero de documento: </label>
        <input type='number' name='documentNumber' value={newStudent.documentNumber} onChange={handleNewStudent}/>
        <label>Nota final: </label>
        <input type='number' name='grade' value={newStudent.grade} onChange={handleNewStudent}/>
        <button type='submit'>Agregar alumno</button>
      </form>
    </div>
  )
}

export default ModifyStudents