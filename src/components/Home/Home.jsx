import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { TextField } from '@mui/material';


import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Home() {

  //Get token
  const token = sessionStorage.getItem("token")

  //State & get courses
  const [courses, setCourses] = useState([])
  useEffect(()=>{
    axios('http://localhost:3000/api/courses', {headers:{'token': token}})
      .then( (data)=>{
        setCourses(data.data)
      })
      .catch(error=>{
        if (error.response.status === 401){
          sessionStorage.clear()
          return (<Navigate to='/login'/>)
        }
        console.log(error);
      })
  },[token])

  //Delete course
  const deleteCourse = (subject)=>{
    axios.delete(`http://localhost:3000/api/courses/subject/${subject}`, {headers:{'token': token}})
      .then(res=>{
        console.log(res);
      })
      .catch(error=>{
        if (error.response.status === 401){
          sessionStorage.clear()
          return (<Navigate to='/login'/>)
        }
        console.log(error);
      })
    axios('http://localhost:3000/api/courses', {headers:{'token': token}})
      .then( (data)=>{
        setCourses(data.data)
      })
  }

  //Filter by...
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
      if (error.response.status === 401){
        sessionStorage.clear()
        return (<Navigate to='/login'/>)
      }
      console.log(error);
    })

    setFilters({
      duration: "",
      year: "",
    })
  }

  //Token validation
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
            Challenge DBLandIT
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
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Challenge DBLandIT
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Proyecto creado para el challenge de desarrollo de DBLandIT. Usando Reactjs, MongoDB, nodeJS y express.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link href='/newcourse'><Button variant="contained">Crear nuevo curso</Button></Link>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          
          <Grid component="form" onSubmit={filter}  noValidate sx={{ mt: 1, display: "flex", justifyContent: "space-around", py:"2rem" }}>
            <TextField
              margin="normal"
              value={filters.duration}
              id="duration"
              name="duration"
              label="Duración"
              type="number"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              value={filters.year}
              id="year"
              name="year"
              label="Año dictado"
              type="number"
              onChange={handleChange}
              />
            <div style={{display: "flex", flexWrap:"wrap", justifyContent:"space-around"}}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{margin: '1rem'}}
                >
                Filtrar
              </Button>
              <Button
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{margin: '1rem'}}
                onClick={(e)=>{
                  setFilters({
                    duration: "",
                    year: "",
                  })
                  filter(e)
                }}
                >
                Borrar filtros
              </Button>
            </div>
          </Grid>
          
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.subject}
                    </Typography>
                    <Typography>
                      Año dictado: {course.year}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/courses/${course.subject}`}><Button size="small">Ver detalles</Button></Link>
                    <Button size="small" onClick={()=>deleteCourse(course.subject)}>Eliminar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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