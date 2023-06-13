import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

import { loginValidation } from '../../../validations';

export default function Login() {

  const navigate = useNavigate()
  
  //Login
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const [ error, setError ] = useState({})

  const handleChange = (e)=>{
    setInputs({...inputs, [e.target.name]: e.target.value})
    setError(
      loginValidation({...inputs, [e.target.name]: e.target.value})
    )
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:3000/api/user/login', inputs)
    .then(res=>{
      sessionStorage.setItem("token", res.data.token)
      navigate('/')
    })
    .catch(error=>{
      setError({...error, credentials: "Crendenciales incorrectas!"})
      console.log(error);
    })
  };

  return (      
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            {error.email && <Typography component="label" variant="p">
            {error.email}
            </Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            {error.password && <Typography component="label" variant="p">
            {error.password}
            </Typography>}

            {error.credentials && <Typography component="label" variant="p" color={red[500]}>
            {error.credentials}
            </Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

  );
}