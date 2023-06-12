import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate } from 'react-router-dom';



const defaultTheme = createTheme();

export default function NewCourse() {
  
  const [inputs, setInputs] = useState(
    {
      username: "",
      email: "",
      password: ""
    }
  )
  
  const token = localStorage.getItem("token")
  if(!token){
    return(
      <Navigate to='/login'/>
    )
  }

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
    
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(inputs, token);
    axios.post('http://localhost:3000/api/courses', inputs, {headers:{'token': token}})
      .then(res=>{
        console.log(res)
      })
      .catch(error=>{
        console.log(error);
      })
      setInputs({
        subject: "",
        duration: "",
        year: ""
      })
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
            <LockOutlinedIcon />
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
    </ThemeProvider>
  );
}