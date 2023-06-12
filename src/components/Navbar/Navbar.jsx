import { AppBar, Toolbar, Typography, Menu, MenuItem, Box, IconButton, Tooltip, Link } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


const Navbar = () => {

  //const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  /*const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };*/
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  /*const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };*/

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.clear()
  }

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          {/*<IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
            <Link href="/courses" color="inherit">
              <MenuItem>
                <Typography textAlign="center">Cursos</Typography>
              </MenuItem>
            </Link>
            <Link href="/newcourse" color="inherit">
              <MenuItem>
                <Typography textAlign="center">Crear Curso</Typography>
              </MenuItem>
            </Link>
            <Link href="/students" color="inherit">
              <MenuItem>
                <Typography textAlign="center">Modificar Alumnos</Typography>
              </MenuItem>
            </Link>
              
          </Menu>*/}
        </Box>
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
          {/*<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link href="/courses" color="inherit">
              <MenuItem>
                <Typography textAlign="center">Cursos</Typography>
              </MenuItem>
            </Link>
            <Link href="/newcourse" color="inherit">
              <MenuItem>
                <Typography textAlign="center">Crear Curso</Typography>
              </MenuItem>
            </Link>
            <Link href="/students" color="inherit">
              <MenuItem>
                <Typography textAlign="center">Modificar Alumnos</Typography>
              </MenuItem>
            </Link>
          </Box>*/}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link href='/login' color='inherit' onClick={logout}>
                <MenuItem>
                  <Typography textAlign="center">Cerrar sesión</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar