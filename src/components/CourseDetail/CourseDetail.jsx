import { Button, Link } from '@mui/material'
import { useParams, Navigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
//import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
//import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import { TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseDetail = () => {

  const token = localStorage.getItem("token")

  const [courseDetails, setCourseDetails] = useState({})

  let {subject} = useParams()

  useEffect(()=>{
    axios(`http://localhost:3000/api/courses/detail?subject=${subject}`,  {headers:{'token': token}})
      .then((data)=>{
        setCourseDetails(data.data)
      })
      .catch(error=>{
        alert("No se pudo obtener el curso...", error)
      })
  },[])
  
  //const [ bestStudent, setBestStudent ] = useState({})

  const getBest =()=>{
    axios(`http://localhost:3000/api/students/outstanding?subject=${courseDetails.subject}`, {headers:{'token': token}})
    .then((data)=>{
      //setBestStudent(data.data)
      alert(`El alumno destacado fue ${data.data.name} ${data.data.surname} y su nota fue ${data.data.grade}`)
    })
    .catch(error=>{
      console.log(error);
    })
  }



  if(!token){
    return(
      <Navigate to='/login'/>
    )
  }
  
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Challenge DBLandIT
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Tema: {courseDetails.subject}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Duración del curso: {courseDetails.duration} meses
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Alumnos
            </Typography>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 500,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
              align="center"
            >
              {courseDetails.students?.map((student) => (
                <li key={student.documentNumber}>
                  <ul>
                    <ListSubheader>{student.name} {student.surname}</ListSubheader>
                      <ListItem>DNI: {student.documentNumber}</ListItem>
                      <ListItem>Direccio {student.address}</ListItem>
                      <ListItem>Nota: {student.grade}</ListItem>
                  </ul>
                </li>
              ))}
            </List>
            
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link href={`/students/${courseDetails.subject}`} ><Button variant="contained">Modificar alumnos</Button></Link>
              <Button variant="contained" onClick={getBest}>Obtener alumno destacado</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </>
  )

  /*return (
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
        <Link href={`/students/${courseDetails.subject}`}>Editar alumnos</Link>
        <Button onClick={getBest}>Obtener alumno destacado</Button>
        {bestStudent.name ? <h4>El alumno destacado es: {bestStudent.name}</h4> : <></>}
      </div> : <h2>Loading...</h2>}
    </div>
  )*/
}

export default CourseDetail