import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Grid, Paper, Typography, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        fetch(`${serverURL}users/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            localStorage.setItem('token', data.token);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <Grid container justifyContent="center" style={{ padding: '30px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '32px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign In
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            placeholder="example.email@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            helperText="Enter at least 8+ characters"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{ marginTop: '16px', backgroundColor: "#E5461D" }}
                        >
                            Next
                        </Button>
                    </form>

                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        Or sign in with
                    </Typography>

                    <Grid container justifyContent="center" spacing={2} style={{ marginTop: '8px' }}>
                        <Grid item>
                            <IconButton aria-label="google">
                                <GoogleIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="facebook">
                                <FacebookIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="apple">
                                <AppleIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default SignIn;