import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import CourseCard from "../CourseCard/CourseCard"
import { Navigate, useNavigate } from "react-router-dom"


const Courses = () => {
  
  const token = localStorage.getItem("token")
  //const navigate = useNavigate()
  //if(token === null) navigate('/login')
  
  const [courses, setCourses] = useState([])

  const deleteCourse = (subject)=>{
    axios.delete(`http://localhost:3000/api/courses/subject/${subject}`)
      .then(res=>{
        console.log(res);
      })
      .catch(error=>{
        console.log(error);
      })
    axios('http://localhost:3000/api/courses')
      .then( (data)=>{
        setCourses(data.data)
      })
  }



  useEffect(()=>{
    axios('http://localhost:3000/api/courses', {headers:{'token': token}})
      .then( (data)=>{
        
        setCourses(data.data)
      })
  },[])
  
  const [filters, setFilters] = useState({
    duration: "",
    year: "",
  })

  const handleChange = (e)=>{
    setFilters({...filters, [e.target.name]: e.target.value})
  }

  const filter = (e)=>{
    e.preventDefault()
    axios(`http://localhost:3000/api/courses/?duration=${filters.duration}&year=${filters.year}`, {headers:{'token': token}})
    .then((data)=>{
      setCourses(data.data)
    })
    .catch(error=>{
      console.log(error);
    })

    setFilters({
      duration: "",
      year: "",
    })
  }
  if(!token){
    return(
      <Navigate to='/login'/>
    )
  }

  return (
    <>
      
      <main>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <form onSubmit={filter}>
          <label>Duración: </label>
          <input type="number" name="duration" value={filters.duration} onChange={handleChange}/>
          <label>Año de dictado: </label>
          <input type="number" name="year" value={filters.year} onChange={handleChange}/>
          <button type="submit">Filtrar</button>
          <button type="button" onClick={(e)=>{
            setFilters({
              duration: "",
              year: "",
            })
            filter(e)
          }}>Borrar filtros</button>
        </form>
        {courses.map((course)=>{
          return(
            <div key={course._id}>
              <CourseCard  course={course}/>
              <Button onClick={()=>deleteCourse(course.subject)}>Eliminar curso</Button>
            </div>
            )
        })}
      </main>
    </>
  )
}

export default Courses