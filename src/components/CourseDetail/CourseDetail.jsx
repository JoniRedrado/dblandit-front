import { Button, Link } from '@mui/material'
import { useParams, Navigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';

import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseDetail = () => {

  //Get token
  const token = sessionStorage.getItem("token")

  //State courseDetails & GET
  const [courseDetails, setCourseDetails] = useState({})

  let {subject} = useParams()

  useEffect(()=>{
    axios(`http://localhost:3000/api/courses/detail?subject=${subject}`,  {headers:{'token': token}})
      .then((data)=>{
        setCourseDetails(data.data)
      })
      .catch(error=>{
        if (error.response.status === 401){
          sessionStorage.clear()
          return (<Navigate to='/login'/>)
        }
        alert("No se pudo obtener el curso...", error)
      })
  },[])
  

  //Get outstanding student
  const getBest =()=>{
    axios(`http://localhost:3000/api/students/outstanding?subject=${courseDetails.subject}`, {headers:{'token': token}})
    .then((data)=>{
      if(!data.data) {
        Swal.fire({
          title: 'Error!',
          text: 'No hay ningun alumno en el curso',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      } else {
        Swal.fire({
          title: 'The BEST!',
          text: `El alumno destacado fue ${data.data.name} ${data.data.surname} y su nota fue ${data.data.grade}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
    })
    .catch(error=>{
      if (error.response.status === 401){
        sessionStorage.clear()
        return (<Navigate to='/login'/>)
      }
      console.log(error);
    })
  }

  //Token validation
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
        
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" style={{display: "flex", flexDirection:"column" , justifyContent: "center", alignItems:"center"}}>
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
            {courseDetails.students?.length === 0 && <Typography variant="h6" align="center" color="text.secondary" paragraph>
              No hay ningún alumno ingresado
            </Typography>}
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
                  <ul style={{display: "flex",flexDirection:"column", justifyContent: "center", alignItems:"center"}} >
                    <ListSubheader style={{fontSize: "1.3rem"}}>{student.name} {student.surname}</ListSubheader>
                      <ListItem>DNI: {student.documentNumber}</ListItem>
                      <ListItem>Direccio {student.address}</ListItem>
                      <ListItem>Nota: {student.grade}</ListItem>
                  </ul>
                  <hr />
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
        
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            DBLandIT
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Desarrollado por Jonathan Redrado
          </Typography>
        </Box>
        
      </main>
    </>
  )
}

export default CourseDetail