import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const CourseCard = ({course}) => {
  return (
    <article>
      <p>{course.subject}</p>
      <p>{course.year}</p>
      <Link to={`/courses/${course.subject}`}>
        <Button>Detalles</Button>
      </Link>
    </article>
  )
}

export default CourseCard