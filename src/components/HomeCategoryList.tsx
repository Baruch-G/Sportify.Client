import React, { useEffect, useState } from 'react'
import CategoryHomeCard, { SportKind } from './CategoryHomeCard';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;



const HomeCategoryList = () => {
    const [categories, setCategories] = useState<SportKind[]>();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        <>
            <Grid container spacing={3} justifyContent="center" style={!isMobile ?  {  padding: '70px' } : {padding: '20px'}}>
                {categories?.map((cat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CategoryHomeCard key={cat.id} sportKind={cat} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}


export default HomeCategoryList