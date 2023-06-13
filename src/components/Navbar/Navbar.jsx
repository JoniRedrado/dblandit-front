import { AppBar, Toolbar, Typography, Box, Link } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import AdbIcon from '@mui/icons-material/Adb';

const Navbar = () => {

  const logout = () => {
    sessionStorage.clear()
  }

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DBLandIT
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
              <Link href='/login' color='inherit' onClick={logout}>
                <LogoutIcon />
              </Link>
          </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar