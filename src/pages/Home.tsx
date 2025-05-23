import React from 'react'
import "./Home.css"
import { Box, Container, Typography, Button } from '@mui/material';
import HomeCategoryList from '../components/HomeCategoryList';
import { Link } from 'react-router-dom';
import { sportToIconMap } from '../data/sportsMap';

const Home = () => {
    // Generate random positions for floating logos
    const getRandomPosition = () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`
    });

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
                        zIndex: 1
                    }}
                />

                {/* Floating logos */}
                <div className="floating-logos">
                    {Object.entries(sportToIconMap).map(([sport, Icon], index) => (
                        // Create 3 instances of each icon with different positions and delays
                        Array.from({ length: 3 }).map((_, instanceIndex) => (
                            <Box
                                key={`${sport}-${instanceIndex}`}
                                className="floating-logo"
                                sx={{
                                    ...getRandomPosition(),
                                    fontSize: '2.5rem',
                                    color: 'white',
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                                    animationDelay: `${(index * 0.5) + (instanceIndex * 2)}s`, // Stagger the animations
                                    opacity: 0.2 + (instanceIndex * 0.1) // Slightly different opacity for each instance
                                }}
                            >
                                {Icon}
                            </Box>
                        ))
                    ))}
                </div>

                {/* Content */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }} className="hero-content">
                    <Typography
                        variant="h1"
                        color="white"
                        gutterBottom
                        className="hero-title"
                        sx={{
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                            fontWeight: 800,
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                            letterSpacing: 1,
                            mb: 5
                        }}
                    >
                        DISCOVER YOUR NEXT CHALLENGE
                    </Typography>

                    <Typography
                        variant="h5"
                        color="white"
                        gutterBottom
                        className="hero-subtitle"
                        sx={{
                            mb: 6,
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                            maxWidth: 500,
                            mx: 'auto',
                        }}
                    >
                        Join sports events that match your passion and skill level
                    </Typography>

                    <Link 
                        to="/events" 
                        style={{ 
                            textDecoration: 'none', 
                            display: 'inline-block' 
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="hero-button animated-button"
                            sx={{
                                px: 3.5,
                                py: 1.2,
                                fontSize: '1rem',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            FIND EVENTS
                        </Button>
                    </Link>
                </Container>
            </Box>
            <HomeCategoryList />
        </div>
    );
};

export default Home;
