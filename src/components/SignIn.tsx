import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Grid, Paper, Typography, TextField, InputAdornment, IconButton, Button, Alert } from "@mui/material";
import React, { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

interface SignInFormData {
    email: string;
    password: string;
}

function SignIn() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState<SignInFormData>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError(null); // Clear error when user types
    }
  
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${serverURL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Login successful - save auth data using context
            login(data);
            
            // Redirect to home page or dashboard
            navigate('/');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>  
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <Paper elevation={3} style={{ padding: 32, maxWidth: 400, width: "100%", margin: 24}}>
                    <Typography variant="h4" align="center" style={{ marginBottom: '16px' }}>Sign In</Typography>
                    
                    {error && (
                        <Alert severity="error" style={{ marginBottom: '16px' }}>
                            {error}
                        </Alert>
                    )}
                    
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        placeholder="example.email@gmail.com" 
                        name="email" 
                        value={form.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        name="password"
                        value={form.password}
                        type={showPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button 
                        type="submit"
                        variant="contained" 
                        fullWidth 
                        style={{ marginTop: '16px', backgroundColor: "#E5461D" }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        Or sign in with
                    </Typography>

                    <Grid container justifyContent="center" spacing={2} style={{ marginTop: '8px' }}>
                        <Grid item>
                            <IconButton aria-label="google" disabled={isLoading}>
                                <GoogleIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="facebook" disabled={isLoading}>
                                <FacebookIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="apple" disabled={isLoading}>
                                <AppleIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </form> 
    );
}

export default SignIn;