import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BookIcon from '@mui/icons-material/Book';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function NewCourse() {
  
  //State inputs & handleChange
  const [inputs, setInputs] = useState(
    {
      username: "",
      email: "",
      password: ""
    }
  )
  
  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
    
  }
  
  //Add course
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(inputs, token);
    axios.post('http://localhost:3000/api/courses', inputs, {headers:{'token': token}})
    .then(res=>{
        console.log(res)
        Swal.fire(
          'Good job!',
          'Curso agregado con exito!',
          'success'
        )
      })
      .catch(error=>{
        if (error.response.status === 401){
          sessionStorage.clear()
          return (<Navigate to='/login'/>)
        } else {
          Swal.fire(
            'Ups!',
            'No se pudo agregar el curso!',
            'error'
          )
        }
        console.log(error);
      })
      setInputs({
        subject: "",
        duration: "",
        year: ""
      })
    }
    
    //Get token & validation
    const token = sessionStorage.getItem("token")
    if(!token){
      return(
        <Navigate to='/login'/>
        )
      }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear curso nuevo
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="subject"
                  required
                  fullWidth
                  id="subject"
                  label="Tema"
                  autoFocus
                  onChange={handleChange}
                  value={inputs.subject}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="duration"
                  required
                  fullWidth
                  id="duration"
                  label="Duración en meses"
                  type='number'
                  onChange={handleChange}
                  value={inputs.duration}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="year"
                  label="Año que se dictó"
                  type="number"
                  id="year"
                  onChange={handleChange}
                  value={inputs.year}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Agregar curso
            </Button>
          </Box>
        </Box>
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