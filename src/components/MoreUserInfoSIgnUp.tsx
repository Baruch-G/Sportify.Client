import { FormControl, InputLabel, Paper } from "@mui/material";
import { Grid, Typography, TextField, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { set } from "date-fns";
import { Email } from "@mui/icons-material";
import { error } from "console";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

interface MoreInfoProps {
    email: string;
    onSubmit: () => void;
}

interface FormData {
    birthDay: Date | null;
    gender: string;
    wheight: number | "";
    height: number | "";
    fitnessGoal: string;
    activityLevel: string;
    email: string;
}

function MoreInfo({email, onSubmit }: MoreInfoProps) {
    const [form, setForm] = useState<FormData>({
        birthDay: null,
        gender: "",
        wheight: "",
        height: "",
        fitnessGoal: "",
        activityLevel: "",
        email: email,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) {
        const { name, value } = e.target;
        setForm({ ...form, [name as string]: value });
    }
    function handleSelectChange(event: SelectChangeEvent<string>) {
        const { name, value } = event.target;
        setForm({ ...form, [name as string]: value });
    }

    function handleDateChange(date: Date | null) {
        if(date){
            const newDate=date.getDate();
            const newMonth=date.getMonth();
            const newYear=date.getFullYear();
            const newDateObj = new Date(newYear, newMonth, newDate);
            setForm({ ...form, birthDay: newDateObj });
        }
    }
    const [errorSubmitMessage, setErrorSubmitMessage] = useState<string>("");
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (
            !form.birthDay ||
            !form.gender ||
            !form.wheight ||
            !form.height ||
            !form.fitnessGoal ||
            !form.activityLevel
        ) {
            setErrorSubmitMessage("Please fill in all required fields.");
        }
    
        // Si tout est OK
        fetchData(form);
        onSubmit();
    }

async function fetchData(form: FormData) {

        fetch(`${serverURL}/users/update`, {
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

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            maxWidth: 600,
            mx: 'auto'
        }}>
            <Typography 
                variant="h4" 
                align="center" 
                sx={{ 
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1
                }}
            >
                Tell us more about yourself
            </Typography>

            <Typography 
                variant="body1" 
                align="center" 
                color="text.secondary"
                sx={{ mb: 2 }}
            >
                This information helps us personalize your experience
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Birth Date *"
                                value={form.birthDay}
                                onChange={handleDateChange}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                        error: !!errorSubmitMessage,
                                        sx: { '& .MuiOutlinedInput-root': { borderRadius: 2 } }
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="gender-label">Gender *</InputLabel>
                            <Select
                                labelId="gender-label"
                                label="Gender"
                                name="gender"
                                value={form.gender}
                                onChange={handleSelectChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Weight (kg) *"
                            name="wheight"
                            type="number"
                            value={form.wheight}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Height (cm) *"
                            name="height"
                            type="number"
                            value={form.height}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="goal-label">Goal *</InputLabel>
                            <Select
                                labelId="goal-label"
                                label="Fitness Goal"
                                name="fitnessGoal"
                                value={form.fitnessGoal}
                                onChange={handleSelectChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            >
                                <MenuItem value="weight loss">Weight Loss</MenuItem>
                                <MenuItem value="muscle gain">Muscle Gain</MenuItem>
                                <MenuItem value="endurance">Endurance</MenuItem>
                                <MenuItem value="flexibility">Flexibility</MenuItem>
                                <MenuItem value="strength">Strength</MenuItem>
                                <MenuItem value="rehabilitation">Rehabilitation</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="activity-label">Activity Level *</InputLabel>
                            <Select
                                labelId="activity-label"
                                label="Activity Level"
                                name="activityLevel"
                                required
                                value={form.activityLevel}
                                onChange={handleSelectChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            >
                                <MenuItem value="sedentary">Sedentary</MenuItem>
                                <MenuItem value="lightly active">Lightly Active</MenuItem>
                                <MenuItem value="moderately active">Moderately Active</MenuItem>
                                <MenuItem value="very active">Very Active</MenuItem>
                                <MenuItem value="extra active">Extra Active</MenuItem>
                                <MenuItem value="athlete">Athlete</MenuItem>
                                <MenuItem value="bodybuilder">Bodybuilder</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {errorSubmitMessage && (
                    <Typography 
                        variant="body2" 
                        color="error" 
                        align="center" 
                        sx={{ mt: 2 }}
                    >
                        {errorSubmitMessage}
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                        },
                    }}
                >
                    Next
                </Button>
            </form>
        </Box>
    );
}

export default MoreInfo;