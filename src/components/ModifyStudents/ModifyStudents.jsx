import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';


import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';

const defaultTheme = createTheme();

const ModifyStudents = () => {

  //Get token
  const token = sessionStorage.getItem("token")

  //States
  const [courseDetails, setCourseDetails] = useState({})
  const [documentNumber, setDocumentNumber] = useState("")
  const [newStudent, setNewStudent] = useState({
    name: "",
    surname: "",
    address: "",
    documentNumber: "",
    grade: "",
  })

  //Delete student
  let {subject} = useParams()
  const deleteStudent = (e, dni= documentNumber)=>{
    if(e !== null) e.preventDefault()
    axios.delete(`http://localhost:3000/api/students?subject=${subject}&documentNumber=${dni}`,  {headers:{'token': token}})
      .then(res=>{
        Swal.fire({
          title: 'Success',
          text: `Alumno eliminado con exito`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        console.log(res);
      })
      .catch(error=>{
        if (error.response.status === 401){
          sessionStorage.clear()
          return (<Navigate to='/login'/>)
        }
        Swal.fire({
          title: 'Error',
          text: `No se pudo eliminar al alumno`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      })
    setDocumentNumber("")
  }

  //Agregar alumno
  const handleNewStudent = (e)=>{
    if (e.target.name === "documentNumber" || e.target.name === "grade"){
      const number = e.target.value
      setNewStudent({...newStudent, [e.target.name]: parseInt(number)})
    } else {
      setNewStudent({...newStudent, [e.target.name]: e.target.value})
    }
  }

  const addStudent = (e)=>{
    e.preventDefault()
    let error = false
    
    for (const key in newStudent) {
      if (newStudent[key].length === 0) {
        error=true
      }
    }

    if(error) {
      return(Swal.fire({
        title: 'Error',
        text: `Todos los campos deben estar completos`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }))
    }
    axios.post('http://localhost:3000/api/students', {subject: courseDetails.subject, data:{...newStudent}}, {headers:{'token': token}})
      .then(res=>{
        console.log(res);
        setNewStudent({
          name: "",
          surname: "",
          address: "",
          documentNumber: "",
          grade: "",
        })
        Swal.fire({
          title: 'Success',
          text: `Alumno agregado con exito`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      })
      .catch(error=>{
        if (error.response.status === 401){
          sessionStorage.clear()
          return (<Navigate to='/login'/>)
        }
        Swal.fire({
          title: 'Error',
          text: `No se pudo agregar al alumno`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      })
  }

  //Get courseDetails
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
    
  },[deleteStudent, addStudent])


  if(!token){
    return(
      <Navigate to='/login'/>
    )
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Tema: {courseDetails.subject}
          </Typography>
        </Toolbar>
      </AppBar>
      
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" style={{textAlign:"center"}} >
            <Button href={`/courses/${courseDetails.subject}`} >
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Tema: {courseDetails.subject}
              </Typography>
            </Button>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4} style={{justifyContent:"center"}}>
            {courseDetails.students?.map((student) => (
              <Grid item key={student.documentNumber} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {student.name} {student.surname}
                    </Typography>
                    <Typography>
                      DNI: {student.documentNumber}
                    </Typography>
                    <Typography>
                      Dirección: {student.address}
                    </Typography>
                    <Typography>
                      Nota final: {student.grade}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>deleteStudent(null, student.documentNumber)}>Eliminar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid component="form" onSubmit={addStudent}  noValidate sx={{ mt: 1, display: "flex", justifyContent: "space-around", py:"2rem" }} container spacing={4}>
            <TextField
              margin="normal"
              value={newStudent.name}
              id="name"
              name="name"
              label="Nombre"
              type="text"
              onChange={handleNewStudent}
              item xs={12} sm={6} md={4}
            />
            <TextField
              margin="normal"
              value={newStudent.surname}
              id="surname"
              name="surname"
              label="Apellido"
              type="text"
              onChange={handleNewStudent}
              item xs={12} sm={6} md={4}
              />
            <TextField
              margin="normal"
              value={newStudent.address}
              id="address"
              name="address"
              label="Domicilio"
              type="text"
              onChange={handleNewStudent}
              item xs={12} sm={6} md={4}
              />
            <TextField
              margin="normal"
              value={newStudent.documentNumber}
              id="documentNumber"
              name="documentNumber"
              label="DNI"
              type="number"
              onChange={handleNewStudent}
              item xs={12} sm={6} md={4}
              />
            <TextField
              margin="normal"
              value={newStudent.grade}
              id="grade"
              name="grade"
              label="Nota final"
              type="number"
              onChange={handleNewStudent}
              item xs={12} sm={6} md={4}
              />
            <div style={{display: "flex", flexWrap:"wrap", justifyContent:"space-around"}}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{margin: '1rem'}}
                >
                Agregar
              </Button>
            </div>
          </Grid>
          
        </Container>
      
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

    </ThemeProvider>
  );
}

export default ModifyStudents