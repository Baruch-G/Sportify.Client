import React, { useState, MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const navPages: NavItem[] = [
  { icon: AccountCircle, path: '/', title: 'Home' },
  { icon: AccountCircle, path: '/events', title: 'Events' },
  { icon: AccountCircle, path: '/calendar', title: 'Calendar' },
  { icon: AccountCircle, path: '/map', title: 'Map View' },
  { icon: AccountCircle, path: '/coaches', title: 'Coaches' },
];

const Navbar: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMobileMenuClick = (event: MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar sx={{ backgroundColor: 'white', color: 'black', position: 'sticky', zIndex: 1 }} position="static">
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* Left section: Logo + Burger icon (on mobile) */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/sportify-logo.png" alt="Sportify Logo" height="40" style={{ marginRight: 8 }} />

          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={handleMobileMenuClick}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Center section: Navigation links (desktop only) */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
            {navPages.map((item, index) => (
              <Typography
                key={index}
                sx={{
                  color: isActive(item.path) ? '#E5461D' : 'gray',
                  fontWeight: isActive(item.path) ? 'bold' : 'unset',
                  cursor: 'pointer',
                  '&:hover': { color: 'black' },
                }}
                onClick={() => navigate(item.path)}
              >
                {item.title}
              </Typography>
            ))}
          </Box>
        )}

        {/* Right section: Avatar or Login/Signup */}
        {false ? (
          <>
            <IconButton sx={{ marginLeft: 'auto' }} onClick={handleAvatarClick}>
              <Avatar alt="User Avatar" src="/avatar.jfif" />
            </IconButton>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link to="/register"><Button size='small' style={{padding: "3px 13px 3px 13px", borderRadius: 5}} color="primary" variant="outlined">LOGIN</Button></Link>
            <Link to="/register"><Button size='small' style={{padding: "3px 13px 3px 13px", borderRadius: 5}} color="primary" variant="contained">SIGN UP</Button></Link>
          </Box>
        )}

        {/* Mobile menu */}
        <Menu anchorEl={mobileMenuAnchor} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
          {navPages.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                navigate(item.path);
                handleMobileMenuClose();
              }}
              sx={{ color: isActive(item.path) ? '#E5461D' : 'inherit', fontWeight: isActive(item.path) ? 'bold' : 'unset' }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>

    </AppBar>
  );
};

export default Navbar;
