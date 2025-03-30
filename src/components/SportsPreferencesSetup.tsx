import React from 'react';
import {
    Button,
    Grid,
    Paper,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import PoolIcon from '@mui/icons-material/Pool';
import KayakingIcon from '@mui/icons-material/Kayaking';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

interface SportsPreferencesSetupProps {
    onSubmit: () => void;
}

function SportsPreferencesSetup(props: SportsPreferencesSetupProps) {
    const sports = [
        { label: 'Running', icon: <DirectionsRunIcon /> },
        { label: 'Dancing', icon: <SportsKabaddiIcon /> },
        { label: 'Football', icon: <SportsSoccerIcon /> },
        { label: 'Yoga', icon: <SelfImprovementIcon /> },
        { label: 'Walking', icon: <DirectionsWalkIcon /> },
        { label: 'Tennis', icon: <SportsTennisIcon /> },
        { label: 'Fishing', icon: <PoolIcon /> },
        { label: 'Climbing', icon: <KayakingIcon /> },
        { label: 'Bike', icon: <DirectionsBikeIcon /> },
        { label: 'Running', icon: <DirectionsRunIcon /> },
        { label: 'Running', icon: <DirectionsRunIcon /> },
        { label: 'Running', icon: <DirectionsRunIcon /> },
    ];

    return (
        <Grid container justifyContent="center" style={{ padding: '30px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '32px' }}>
                    <Typography variant="h5" gutterBottom>
                        1. Which sports do you like?
                    </Typography>

                    <Grid container spacing={2}>
                        {sports.map((sport, index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={<Checkbox sx={{
                                        '&.Mui-checked': {
                                            color: "red",
                                        },
                                    }} />}
                                    label={
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item>{sport.icon}</Grid>
                                            <Grid item>{sport.label}</Grid>
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