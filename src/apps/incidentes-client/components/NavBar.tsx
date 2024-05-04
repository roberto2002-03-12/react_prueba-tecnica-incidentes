import { useAuthApi } from '../../auth/hook/useAuthApi';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ConstructionIcon from '@mui/icons-material/Construction';
import '../../user_management/styles/NavBarStyle.css'

export const NavBar = () => {
  const { logout } = useAuthApi();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ backgroundColor: '#1c246b' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              marginLeft: '10px',
              width: '35px',
              height: '35px'
            }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Reporte de incidencias
          </Typography>
          <div className="dropdown dropstart">
            <button className="btn dropdown-toggle dropdown-navbar-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <ConstructionIcon />
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/user-management/profile">Perfil</Link></li>
              <li><button className="dropdown-item" style={{ border: '0' }} onClick={() => logout()}>Cerrar sesión</button></li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
