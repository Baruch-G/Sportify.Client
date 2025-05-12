
import { VisibilityOff, Visibility, Email } from "@mui/icons-material";
import { Grid, Paper, Typography, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useState } from "react";
import { GoogleMap, useJsApiLoader ,StandaloneSearchBox} from '@react-google-maps/api'
import { is } from "date-fns/locale";
import { ref } from "process";
import { on } from "events";
import { set } from "date-fns";
import { get } from "http";
interface SignUpProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: number | null;
    password: string;
    address: string;
    location: {
        longitude: number|null,
        latitude:  number|null,
      },
  }
  

function SignUp({ onSubmit }: SignUpProps) {
    //google api for autocompletion address
    const inputref=useRef<any>(null);
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })
    
    function getlocationofUser() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setForm((prev) => ({
                ...prev,
                location: { latitude, longitude }
            }));
        });
    }
    useEffect(() => {
        getlocationofUser();
    }, []);
    
    const [showPassword, setShowPassword] = React.useState(false);
    const [form, setForm] = useState<FormData>({ firstName: "",lastName: "",email: "",phone:null, password: "", address: "" ,location:{longitude:null,latitude: null}});
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const [emailError, setEmailError] = useState<string>("");
    const[passwordError, setPasswordError] = useState<string>("");
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
      if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                setEmailError("Email invalide");
            } else {
                setEmailError("");
            }
        }
        if (name === "phone") {
            setForm({ ...form, phone: value === "" ? null : Number(value) });
        }
        if (name==="password") {
            if (value.length < 8) {
                setPasswordError("Password must be at least 8 characters");
            } else {
                setPasswordError("");
            }
        }
    }
  const [errorSubmitMessage, setErrorSubmitMessage] = useState<string>("");
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(form.email)) {
            setEmailError("Email invalide");
            return;
        }
        setEmailError("");
        if(form.firstName && form.lastName && form.phone && form.password && form.address && form.password.length<8){
            setErrorSubmitMessage("Please fill correctly all required fields.");
            return;
        }
        fetchData(form);
        onSubmit(form);
    }
    function fetchData(form:FormData) {
        fetch('http://localhost:3000/users/register', {
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
    const handleOnPlacesChanged = () => {
        const places = inputref.current.getPlaces();
        if (places && places.length > 0) {
            setForm({ ...form, address: places[0].formatted_address || places[0].name });
        }
    }
    return (
        <form onSubmit={handleSubmit} >  
        <Typography variant="h4" align="center" style={{ marginBottom: '16px' }}>Sign Up</Typography>
                    <Grid container justifyContent="center" style={{ padding: '15px' }}>
                        <Grid item xs={5} sm={0} style={{ padding: '16px' }}>
                            <TextField label="First Name" required variant="outlined" fullWidth margin="normal" name="firstName" value={form.firstName}onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={5} sm={0}style={{ padding: '16px' }}>
                            <TextField label="Last Name"  required variant="outlined" fullWidth margin="normal" name="lastName" value={form.lastName}onChange={handleChange}/>
                        </Grid>
                    </Grid>

                    <TextField label="Email" variant="outlined" fullWidth margin="normal" placeholder="example.email@gmail.com" name="email" value={form.email}onChange={handleChange } error={!!emailError}
                helperText={emailError} required  />
                    <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" value={form.phone} name="phone" onChange={handleChange} required/>
                    {isLoaded && 
                        <StandaloneSearchBox onLoad={(ref) => inputref.current = ref} onPlacesChanged={handleOnPlacesChanged}>

                            <TextField label="Address" required variant="outlined" fullWidth margin="normal" value={form.address} name="address" onChange={handleChange}placeholder="Enter your Address"/>
                        </StandaloneSearchBox>
                    }
                 
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                        name="password"
                        helperText={passwordError}
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
                    />
                    {errorSubmitMessage && <Typography color="error" align="center">{errorSubmitMessage}</Typography>}
                    <Button type="submit"variant="contained" fullWidth style={{ marginTop: '16px', backgroundColor : "#E5461D" }}> Next</Button>

                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        Or sign up with
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

        </form>
    );
}

export default SignUp;