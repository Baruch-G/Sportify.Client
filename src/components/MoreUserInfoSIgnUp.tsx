import { FormControl, InputLabel, Paper } from "@mui/material";
import { Grid, Typography, TextField, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { set } from "date-fns";
import { Email } from "@mui/icons-material";
import { error } from "console";

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
        <Grid container justifyContent="center" style={{ padding: '30px' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" align="center" gutterBottom>More About You</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DateField
                                    value={form.birthDay}
                                    onChange={handleDateChange}
                                    label="Birth Date"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">Gender *</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        label="Gender"
                                        name="gender"
                                        required
                                        value={form.gender}
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Weight (kg)"
                                    type="number"
                                    required
                                    fullWidth
                                    name="wheight"
                                    value={form.wheight}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Height (cm)"
                                    type="number"
                                    required
                                    fullWidth
                                    name="height"
                                    value={form.height}
                                    onChange={handleChange}
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
                                    >
                                        <MenuItem value="sedentary">Sedentary</MenuItem>
                                        <MenuItem value="lightly active">Lightly Active</MenuItem>
                                        <MenuItem value="moderately active">Moderately Active</MenuItem>
                                        <MenuItem value="very active">Very Active</MenuItem>
                                        <MenuItem value="extra active">Extra Active</MenuItem>
                                        <MenuItem value="athlete">Athlete</MenuItem>
                                        <MenuItem value="bodybuilder">Bodybuilder</MenuItem>
                                        <MenuItem value="powerlifter">Powerlifter</MenuItem>
                                        <MenuItem value="crossfitter">Crossfitter</MenuItem>
                                        <MenuItem value="endurance athlete">Endurance Athlete</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="error" align="center" style={{ marginTop: '16px' }}>
                            {errorSubmitMessage}
                        </Typography>
                        <Button type = "submit"
                            // onClick={(e) => { e.preventDefault(); handleSubmit(e); fetchData(form); onSubmit(); }}
                            variant="contained"
                            fullWidth
                            style={{ marginTop: '24px', backgroundColor: "#E5461D" }}
                        >
                            Next
                        </Button>
                    </form>
                </LocalizationProvider>
        </Grid>
    );
}

export default MoreInfo;