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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CssBaseline from '@mui/material/CssBaseline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions/userActions';


const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElNav2, setAnchorElNav2] = React.useState(null);
  const [anchorElUser2, setAnchorElUser2] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenUserMenu2 = (event) => {
    setAnchorElUser2(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (furl) => {
    setAnchorElUser(null);

    //logout
    if(furl==='/login'){
      dispatch(logout())
    }

    history.push(furl)

    
  };
  const handleCloseUserMenu2 = (furl) => {
    setAnchorElUser2(null);

    //logout
    if(furl==='/login'){
      dispatch(logout())
    }

    history.push(furl)

    
  };

  return (
    <header>
      <CssBaseline />
    <AppBar position="sticky" sx={{backgroundColor:'#2c3238'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <ShoppingBasketIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <NavLink to="/">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Varela Round',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHOPPERMARK
          </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
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
              <MenuItem  onClick={handleCloseNavMenu}>
              <NavLink to='/cart'>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <ShoppingCartIcon/>
                <Typography textAlign="center" sx={{fontFamily:'Poppins'}}>Cart</Typography>
                </div>
                </NavLink>
                  
                </MenuItem>
                {!userInfo && <MenuItem  onClick={handleCloseNavMenu}>
                <NavLink to='/login'>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <PersonIcon/>
                <Typography textAlign="center" sx={{fontFamily:'Poppins'}}>Login</Typography>
                </div>
                </NavLink>
                </MenuItem>}
            </Menu>
          </Box>
          <ShoppingBasketIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <NavLink to="/">
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Varela Round',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHOPPERMARK
          </Typography>     
        </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', marginRight:'1rem' }}>
          <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#c0c2c3', display: 'block', fontFamily:'Poppins' }}
              >
                <NavLink to='/cart'>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <ShoppingCartIcon/>
                Cart
                </div>
                </NavLink>
              </Button>
              {!userInfo && <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#c0c2c3', display: 'block', fontFamily:'Poppins' }}
                              >
                            <NavLink to='/login'>
                            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                            <PersonIcon/>
                            Login
                            </div>
                            </NavLink>
                          </Button>}
          </Box>

          {userInfo && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ backgroundColor: '#c0c2c3', padding: '5px 15px', margin:'0 0', fontFamily:'Poppins', fontWeight:'700' }}>
                {userInfo.name[0].toUpperCase()}
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
              <MenuItem onClick={()=> handleCloseUserMenu('/profile')}>
                  <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={()=> handleCloseUserMenu('/')}>
                  <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={()=> handleCloseUserMenu('/login')}>
                  <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>}
          {userInfo && userInfo.isAdmin && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <div onClick={handleOpenUserMenu2} style={{ color:'#c0c2c3', padding: '5px 15px', margin:'0 10px', fontFamily:'Poppins', fontWeight:'700' }}>
                Admin Panel
              </div>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser2}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser2)}
              onClose={handleCloseUserMenu2}
            >
              <MenuItem onClick={()=> handleCloseUserMenu2('/admin/userslist')}>
                  <Typography textAlign="center">Users List</Typography>
              </MenuItem>
              <MenuItem onClick={()=> handleCloseUserMenu2('/admin/productlist')}>
                  <Typography textAlign="center">Products</Typography>
              </MenuItem>
              <MenuItem onClick={()=> handleCloseUserMenu2('/admin/orderlist')}>
                  <Typography textAlign="center">Orders</Typography>
              </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
    </header>
  );
};
export default Header;
