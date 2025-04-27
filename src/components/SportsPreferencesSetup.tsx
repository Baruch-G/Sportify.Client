import React from 'react';
import {
    Button,
    Grid,
    Paper,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { sportToIconMap } from '../data/sportsMap';

interface SportsPreferencesSetupProps {
    onSubmit: () => void;
}

// todo: fetch categories from backend

function SportsPreferencesSetup(props: SportsPreferencesSetupProps) {
    return (
        <Grid container justifyContent="center" style={{ padding: '30px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '32px' }}>
                    <Typography variant="h5" gutterBottom>
                        1. Which sports do you like?
                    </Typography>

                    <Grid container spacing={2}>
                        {Object.entries(sportToIconMap).map(([label, icon], index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={<Checkbox sx={{
                                        '&.Mui-checked': {
                                            color: "red",
                                        },
                                    }} />}
                                    label={
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item>{icon}</Grid>
                                            <Grid item>{label}</Grid>
                                        </Grid>
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button onClick={props.onSubmit} variant="contained" fullWidth style={{ marginTop: '16px', backgroundColor: "#E5461D" }}>
                        Done
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default SportsPreferencesSetup;