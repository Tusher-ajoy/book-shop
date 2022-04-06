import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { Avatar } from '@mui/material';

const pages = ['Home', 'Orders', 'Admin', 'Deals'];


const Headers = () => {
  const [loggedInUser, setLoggedInUser] = React.useContext(userContext);
  const {img} = loggedInUser;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    const destination = event.currentTarget.textContent;
    const destinationInLowercase = destination.toLowerCase();
    navigate(`/${destinationInLowercase}`)
  };

  const handleCloseNavMenu = (event) => {
    const destination = event.currentTarget.textContent;
    const destinationInLowercase = destination.toLowerCase();
    navigate(`/${destinationInLowercase}`)
  };


  return (
    <AppBar position="static" style={{backgroundColor:'white'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="rgba(54, 57, 88, 1)"
            fontWeight="fontWeightBold"
            sx={{ flexGrow: 1, mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            BOOK SHOP
          </Typography>

          {/* Small device version */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> 
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="rgba(54, 57, 88, 1)"
            fontWeight="fontWeightBold"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            BOOK SHOP
          </Typography>
         

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 3, color: 'rgba(60, 60, 60, 1)',fontWeight: 600, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {img ? <Avatar alt="User image" src={img} /> : <Button variant="contained" sx={{ backgroundColor:'rgba(105, 70, 244, 1)', '&:hover':{backgroundColor: 'rgba(69, 27, 237, 1)'} }} onClick={()=>navigate('/login')}>Login</Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Headers;
