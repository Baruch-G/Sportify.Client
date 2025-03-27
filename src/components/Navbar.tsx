import React, { useState, MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const navPages: NavItem[] = [
  { icon: AccountCircle, path: '/', title: 'Events' },
  { icon: AccountCircle, path: '/calendar', title: 'Calendar' },
  { icon: AccountCircle, path: '/map', title: 'Map View' },
  { icon: AccountCircle, path: '/coaches', title: 'Coaches' },
];

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ backgroundColor: 'white', color: 'black' }} position="static">
      <Toolbar>
        {/* Logo */}
        <img src="sportify-logo.png" alt="Sportify Logo" height="40" style={{ marginRight: 16 }} />

        {isMobile ? (
          // Mobile Menu
          <>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          // Desktop Menu
          <Box sx={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
            {navPages.map((item, index) => (
              <Typography
                key={index}
                sx={{ color: 'gray', cursor: 'pointer', '&:hover': { color: 'black' } }}
                onClick={() => navigate(item.path)}
              >
                {item.title}
              </Typography>
            ))}
          </Box>
        )}

        {/* User Avatar/Menu */}
        <IconButton sx={{ marginLeft: 'auto' }} onClick={handleAvatarClick}>
          <Avatar alt="User Avatar" src="/avatar.jfif" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
