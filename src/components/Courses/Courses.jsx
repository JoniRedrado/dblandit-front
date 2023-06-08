import axios from "axios"
import { useEffect, useState } from "react"
import CourseCard from "../CourseCard/CourseCard"


const Courses = (props) => {

  const [courses, setCourses] = useState([])

  useEffect(()=>{
    axios('http://localhost:3000/api/courses')
      .then( (data)=>{
        console.log(data);
        setCourses(data.data)
      })
  },[])
  console.log(props);
  return (
    <main>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      {courses.map((course)=>{
        return(
          <CourseCard key={course._id} course={course}/>
          )
      })}
    </main>
  )
}

export default Courses