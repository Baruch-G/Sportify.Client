import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Grid, Paper, Typography, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

interface SignInProps {
    onSubmit : () => void;
}

function SignIn(props : SignInProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <Grid container justifyContent="center" style={{ padding: '30px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '32px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign In
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="First Name" variant="outlined" fullWidth margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" variant="outlined" fullWidth margin="normal" />
                        </Grid>
                    </Grid>

                    <TextField label="Email" variant="outlined" fullWidth margin="normal" placeholder="example.email@gmail.com" />
                    <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" />

                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
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

                    <Button onClick={props.onSubmit} variant="contained" fullWidth style={{ marginTop: '16px', backgroundColor : "#E5461D" }}>
                        Next
                    </Button>

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