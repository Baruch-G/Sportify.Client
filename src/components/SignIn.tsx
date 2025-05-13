import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Grid, Paper, Typography, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useState } from "react";

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

interface SignInProps {
    onSubmit : () => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }


function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    const [form, setForm] = useState<FormData>({ firstName: "",lastName: "",email: "",phone:"", password: "" });
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
  
    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      console.log(form);
    }
    function fetchData(form:FormData) {
        fetch(`${serverURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                console.log(response);
            }
            return response.json();
        }
        )
        .then((data) => {
            console.log('Success:', data);
        }
        )
        .catch((error) => {
            console.error('Error:', error);
        }
        );
    }

    return (
<form onSubmit={handleSubmit}>  
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Paper elevation={3} style={{ padding: 32, maxWidth: 800, width: "100%", margin: 24}}>
            <Typography variant="h4" align="center" style={{ marginBottom: '16px' }}>Sign In</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="First Name" variant="outlined" fullWidth margin="normal" name="firstName" value={form.firstName}onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" variant="outlined" fullWidth margin="normal" name="lastName" value={form.lastName}onChange={handleChange}/>
                        </Grid>
                    </Grid>

                    <TextField label="Email" variant="outlined" fullWidth margin="normal" placeholder="example.email@gmail.com" name="email" value={form.email}onChange={handleChange} />
                    <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" value={form.phone} name="phone" onChange={handleChange}/>

                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        name="password"
                        value={form.password}
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

                    <Button onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e); // Appelle handleSubmit manuellement
                        fetchData(form); // Appelle fetchData avec les données du formulaire
                        // props.onSubmit(); // Si tu veux exécuter également le onSubmit passé en props
                    }} variant="contained" fullWidth style={{ marginTop: '16px', backgroundColor : "#E5461D" }}>
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
    </div>
</form> 
  
);
}

export default SignIn;