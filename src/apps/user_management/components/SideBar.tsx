import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import EastIcon from '@mui/icons-material/East';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Box from '@mui/material/Box';
import { IStoreRedux } from '../../../store'

export const SideBar = () => {
  const { user, options } = useSelector((state: IStoreRedux) => state.auth);

  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (open: boolean) => () => {
    setState({ left: open })
  }

  const listSideBar = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Button
        onClick={() => setState({ left: false })}
        sx={{
          marginLeft: '190px',
          color: '#1c246b'
        }}
      >
        <EastIcon sx={{ width: '26px', height: '26px' }} />
      </Button>
      <Box
        sx={{
          width: 250,
          height: 135,
          display: 'flex'
        }}
      >
        <div style={{ paddingTop: '10px', paddingLeft: '10px' }}>
          <AccountCircleIcon
            sx={{
              width: 115,
              height: 115,
            }}
          />
        </div>

        <div
          style={{
            paddingTop: '10px',
            width: '115px',
            fontSize: '13px',
          }}
        >
          <div style={{ height: '85px' }}>
            <p>{ user.profile && user.profile.firstName && user.profile.lastName ? `${user.profile.firstName} ${user.profile.lastName}` : `${user.email}`}</p>
          </div>
          <div>
            <p>{typeof user.role === 'undefined' || user.role.length === 0 ? '---' : `${user.role[0].roleName}`}</p>
          </div>
        </div>
      </Box>
      <List>
        {
          options.map((opt) => (
            <ListItem key={opt.icon} disablePadding>
              <Link
                to={opt.url}
                style={{
                  textDecoration: 'none',
                  color: 'gray',
                  width: '250px'
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {
                      opt.icon === 'home' ? <HomeIcon /> :
                      opt.icon === 'users' ? <PersonIcon /> :
                      opt.icon === 'roles' ? <GroupsIcon /> :
                      opt.icon === 'ubicacion' ? <ApartmentIcon /> :
                      opt.icon === 'incidente' ? <LocationOnIcon /> :
                      <QuestionMarkIcon />
                    }
                  </ListItemIcon>
                  <ListItemText primary={opt.menu} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        }
      </List>
    </Box>
  )

  return (
    <>
      <MenuOpenIcon
        sx={{ color: 'white' }}
        onClick={toggleDrawer(true)}
      />
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer(false)}
      >
        {listSideBar()}
      </Drawer>
    </>
  )
}
