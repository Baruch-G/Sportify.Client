import React, { useState } from 'react';
import {
    Button,
    Grid,
    Typography,
    Checkbox,
    FormControlLabel,
    Box,
} from '@mui/material';
import { sportToIconMap } from '../data/sportsMap';

interface SportsPreferencesSetupProps {
    onSubmit: () => void;
    email: string;
}
interface FormData {
    favoriteCategoryIds: string[];
    email: string;
}

async function fetchData(form: FormData) {

    fetch('http://localhost:3000/users/updateFavoritesSports', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function SportsPreferencesSetup(props: SportsPreferencesSetupProps) {
    const [form, setForm] = useState<FormData>({
        favoriteCategoryIds: [],
        email: props.email,
    });

    function handleCheckboxChange(sport: string) {
        setForm((prev) => {
            const alreadySelected = prev.favoriteCategoryIds.includes(sport);
            return {
                ...prev,
                favoriteCategoryIds: alreadySelected
                    ? prev.favoriteCategoryIds.filter((s) => s !== sport)
                    : [...prev.favoriteCategoryIds, sport],
            };
        });
    }


    return (
        <Grid container justifyContent="center" style={{ padding: '30px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h5" align="center" gutterBottom>
                        1. Which sports do you like?
                    </Typography>

                    <Grid container spacing={7} justifyContent="center">
                        {Object.entries(sportToIconMap).map(([label, icon], index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': { color: "red" },
                                            }}
                                            checked={form.favoriteCategoryIds.includes(label)}
                                            onChange={() => handleCheckboxChange(label)}
                                        />
                                    }
                                    label={
                                        <Box display="flex" alignItems="center">
                                            <Box mr={1}>{icon}</Box>
                                            {label}
                                        </Box>
                                    }
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        onClick={(e) => { e.preventDefault();  fetchData(form); props.onSubmit(); }}
                        variant="contained"
                        fullWidth
                        style={{ marginTop: '24px', backgroundColor: "#E5461D", maxWidth: 300 }}

                    >
                        Done
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default SportsPreferencesSetup;