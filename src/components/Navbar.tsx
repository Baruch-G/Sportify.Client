import React, { useState, MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box, Button, Container } from '@mui/material';
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
    <AppBar 
      sx={{ 
        backgroundColor: 'white', 
        color: 'black', 
        position: 'sticky', 
        zIndex: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }} 
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 }, py: 1 }}>
          {/* Left section: Logo + Burger icon (on mobile) */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <img 
              src="/sportify-logo.png" 
              alt="Sportify Logo" 
              height="40" 
              style={{ 
                marginRight: 8,
                transition: 'transform 0.2s ease'
              }} 
            />

            {isMobile && (
              <IconButton 
                edge="end" 
                color="inherit" 
                onClick={handleMobileMenuClick}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Center section: Navigation links (desktop only) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: '32px', flexGrow: 1, ml: 2 }}>
              {navPages.map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    color: isActive(item.path) ? 'var(--primary-color)' : 'var(--text-light)',
                    fontWeight: isActive(item.path) ? 600 : 500,
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': { 
                      color: 'var(--primary-color)',
                      '&::after': {
                        width: '100%',
                        opacity: 1
                      }
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: isActive(item.path) ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'var(--primary-color)',
                      transition: 'width 0.2s ease, opacity 0.2s ease',
                      opacity: isActive(item.path) ? 1 : 0
                    }
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
              <IconButton 
                sx={{ 
                  marginLeft: 'auto',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }} 
                onClick={handleAvatarClick}
              >
                <Avatar 
                  alt="User Avatar" 
                  src="/avatar.jfif"
                  sx={{
                    border: '2px solid var(--primary-color)',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </IconButton>
              <Menu 
                anchorEl={menuAnchor} 
                open={Boolean(menuAnchor)} 
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                  }
                }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link to="/register">
                <Button 
                  size='small' 
                  sx={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.04)'
                    }
                  }} 
                  color="primary" 
                  variant="outlined"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size='small' 
                  sx={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'var(--secondary-color)'
                    }
                  }} 
                  color="primary" 
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Link>
            </Box>
          )}

          {/* Mobile menu */}
          <Menu 
            anchorEl={mobileMenuAnchor} 
            open={Boolean(mobileMenuAnchor)} 
            onClose={handleMobileMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                minWidth: '200px'
              }
            }}
          >
            {navPages.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  navigate(item.path);
                  handleMobileMenuClose();
                }}
                sx={{ 
                  color: isActive(item.path) ? 'var(--primary-color)' : 'inherit',
                  fontWeight: isActive(item.path) ? 600 : 500,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.04)'
                  }
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
