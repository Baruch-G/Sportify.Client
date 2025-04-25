import React from 'react'
import "./Home.css"
import { Box, Container, Typography, Button } from '@mui/material';
import HomeCategoryList from '../components/HomeCategoryList';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <Box
                sx={{
                    position: 'relative',
                    height: 400,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Background image */}
                <Box
                    component="img"
                    src="/sligo-sports.png"
                    alt="Sports team"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />

                {/* Dark overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                />

                {/* Content */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Typography
                        variant="h1"
                        color="white"
                        gutterBottom
                        sx={{
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                            fontWeight: 800,
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                            letterSpacing: 1,
                        }}
                    >
                        DISCOVER YOUR NEXT CHALLENGE
                    </Typography>

                    <Typography
                        variant="h5"
                        color="white"
                        gutterBottom
                        sx={{
                            mb: 4,
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        Join sports events that match your passion and skill level
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            borderRadius: 30,   
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/events">FIND EVENTS</Link>
                    </Button>
                </Container>

            </Box>
            <HomeCategoryList />
        </div>
    );
};

export default Home;
