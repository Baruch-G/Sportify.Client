import React, { useState, MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
  Container,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import { FaHome, FaCalendarAlt, FaMapMarkedAlt, FaUserFriends, FaRunning } from 'react-icons/fa';

interface NavItem {
  title: string;
  path: string;
  icon: IconType;
}

const navPages: NavItem[] = [
  { title: 'Home', path: '/', icon: FaHome },
  { title: 'Events', path: '/events', icon: FaRunning },
  { title: 'Calendar', path: '/calendar', icon: FaCalendarAlt },
  { title: 'Map View', path: '/map', icon: FaMapMarkedAlt },
  { title: 'Coaches', path: '/coaches', icon: FaUserFriends },
];

const Navbar: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const handleMobileMenuClick = (event: MouseEvent<HTMLElement>) => setMobileMenuAnchor(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchor(null);
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      sx={{
        backgroundColor: 'white',
        color: 'black',
        position: 'sticky',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: 1, py: 1 }}>
          {/* Logo and burger icon */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/sportify-logo.png"
              alt="Sportify"
              height="40"
              style={{ marginRight: 12 }}
            />
            {isMobile && (
              <IconButton onClick={handleMobileMenuClick} sx={{ ml: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navPages.map(({ title, path, icon: Icon }) => (
                <Button
                  key={title}
                  onClick={() => navigate(path)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: isActive(path) ? 600 : 500,
                    color: isActive(path) ? 'var(--primary-color)' : 'text.secondary',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'var(--primary-color)',
                    },
                  }}
                >
                  <Icon size={18} />
                  {title}
                </Button>
              ))}
            </Box>
          )}

          {/* Right side: auth buttons or avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Replace false with actual authentication logic */}
            {false ? (
              <>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar src="/avatar.jfif" />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: { mt: 1.5, borderRadius: '8px' }
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" color="primary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" color="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            PaperProps={{ sx: { mt: 1.5, borderRadius: 2 } }}
          >
            {navPages.map(({ title, path, icon: Icon }) => (
              <MenuItem
                key={title}
                onClick={() => {
                  navigate(path);
                  handleMobileMenuClose();
                }}
                sx={{
                  color: isActive(path) ? 'var(--primary-color)' : 'inherit',
                  fontWeight: isActive(path) ? 600 : 500,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Icon size={16} />
                {title}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
