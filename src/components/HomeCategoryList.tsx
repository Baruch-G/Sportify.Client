import React, { useEffect, useState } from 'react'
import CategoryHomeCard, { SportKind } from './CategoryHomeCard';
import { Grid, Link, useMediaQuery, useTheme } from '@mui/material';
const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;
import { Link as RouterLink } from 'react-router-dom';



const HomeCategoryList = () => {
    const [categories, setCategories] = useState<SportKind[]>();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${serverURL}/categories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json() as SportKind[];
                setCategories(data);
            } catch (err: any) {
                console.error("error lloading categoriesd");
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <Grid 
                container 
                spacing={3} 
                justifyContent="center" 
                style={isMobile ? { padding: '20px' } : { padding: '35px 70px 10px 70px' }}
            >
                {categories?.map((cat, index) => (
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        key={index}
                        sx={{
                            animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
                        }}
                    >
                        <RouterLink to={`/events?category=${cat._id}`} style={{ textDecoration: 'none' }}>
                            <CategoryHomeCard key={cat._id} sportKind={cat} />
                        </RouterLink>
                    </Grid>
                ))}
            </Grid>

            <Grid container justifyContent="center" sx={{ mt: 2, mb: 4 }}>
                <Link
                    component="button"
                    variant="body1"
                    onClick={() => {}}
                    className="animated-button"
                    sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'none',
                            color: 'primary.main'
                        }
                    }}
                >
                    Load more
                </Link>
            </Grid>
        </div>
    )
}


export default HomeCategoryList