import { VisibilityOff, Visibility, Email, CloudUpload } from "@mui/icons-material";
import { 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Button,
  Box,
  CircularProgress,
  Divider,
  Alert,
  useTheme,
  alpha
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useAuth } from "../context/AuthContext";

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;
const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

interface SignUpProps {
  onSubmit: (formData: FormData & { token: string }) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | null;
  password: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
  };
  location: {
    longitude: number | null;
    latitude: number | null;
  };
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  address?: {
    addressLine1?: string;
    city?: string;
    country?: string;
  };
  location?: string;
  submit?: string;
}

function SignUp({ onSubmit }: SignUpProps) {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    password: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: ""
    },
    location: { longitude: null, latitude: null }
  });

  const { user, logout, login} = useAuth();

  const addressInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadAutocomplete = () => {
      if (!window.google || !addressInputRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['geocode'],
      });

      autocomplete.setFields(['address_components', 'geometry']);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const getComponent = (type: string) =>
          place.address_components?.find((c: google.maps.GeocoderAddressComponent) => c.types.includes(type))?.long_name || '';

        const streetNumber = getComponent('street_number');
        const route = getComponent('route');
        const locality = getComponent('locality') || getComponent('sublocality') || getComponent('administrative_area_level_2');
        const countryVal = getComponent('country');

        setForm(prev => ({
          ...prev,
          address: {
            ...prev.address,
            addressLine1: `${streetNumber} ${route}`.trim(),
            city: locality,
            country: countryVal,
            addressLine2: prev.address.addressLine2 // Preserve existing address line 2
          },
          location: {
            latitude: place.geometry?.location?.lat() || null,
            longitude: place.geometry?.location?.lng() || null
          }
        }));
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&language=en`;
      script.async = true;
      script.onload = loadAutocomplete;
      document.body.appendChild(script);
    } else {
      loadAutocomplete();
    }
  }, []);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[\d\s-]{10,}$/;

    if (!form.firstName.trim()) errors.firstName = "First name is required";
    if (!form.lastName.trim()) errors.lastName = "Last name is required";
    if (!emailPattern.test(form.email)) errors.email = "Please enter a valid email address";
    if (!phonePattern.test(form.phone?.toString() || "")) errors.phone = "Please enter a valid phone number";
    if (form.password.length < 8) errors.password = "Password must be at least 8 characters";
    
    // Address validation
    if (!form.address.addressLine1.trim()) {
      errors.address = { ...errors.address, addressLine1: "Address is required" };
    }
    if (!form.address.city.trim()) {
      errors.address = { ...errors.address, city: "City is required" };
    }
    if (!form.address.country.trim()) {
      errors.address = { ...errors.address, country: "Country is required" };
    }
    if (!form.location.latitude || !form.location.longitude) {
      errors.location = "Please select a valid address from the sugges tions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      if (formErrors.address?.[field as keyof typeof formErrors.address]) {
        setFormErrors(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [field]: undefined
          }
        }));
      }
    } else if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const userData = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        address: form.address,
        location: form.location
      };

      const response = await fetch(`${serverURL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();

      login(data);
      onSubmit({ ...form, token: data.accessToken });
    } catch (error: any) {
      console.error('Error:', error);
      setFormErrors(prev => ({
        ...prev,
        submit: error.message || "Registration failed. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialButtonStyle = {
    width: '48px',
    height: '48px',
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.9),
    },
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: 600,
        mx: 'auto'
      }}
    >
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: 700,
          color: 'primary.main',
          mb: 1
        }}
      >
        Create Account
      </Typography>

      {formErrors.submit && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formErrors.submit}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
            fullWidth
            required
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
            fullWidth
            required
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
      </Grid>

      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        fullWidth
        required
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="action" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Phone Number"
        name="phone"
        type="tel"
        value={form.phone || ''}
        onChange={handleChange}
        error={!!formErrors.phone}
        helperText={formErrors.phone}
        fullWidth
        required
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />

      <TextField
        fullWidth
        inputRef={addressInputRef}
        name="ignore-address-autofill"
        autoComplete="off"
        label="Search Address"
        margin="normal"
        inputProps={{
          autoComplete: 'new-password',
          form: { autoComplete: 'off' },
        }}
        error={!!formErrors.location}
        helperText={formErrors.location}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />

      <TextField
        fullWidth
        label="Address Line 1"
        name="address.addressLine1"
        value={form.address.addressLine1}
        onChange={handleChange}
        error={!!formErrors.address?.addressLine1}
        helperText={formErrors.address?.addressLine1}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />

      <TextField
        fullWidth
        label="Address Line 2 (Optional)"
        name="address.addressLine2"
        value={form.address.addressLine2}
        onChange={handleChange}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="address.city"
            value={form.address.city}
            onChange={handleChange}
            error={!!formErrors.address?.city}
            helperText={formErrors.address?.city}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="address.country"
            value={form.address.country}
            onChange={handleChange}
            error={!!formErrors.address?.country}
            helperText={formErrors.address?.country}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
      </Grid>

      <TextField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={form.password}
        onChange={handleChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        fullWidth
        required
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
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
        size="large"
        disabled={isSubmitting}
        sx={{
          mt: 2,
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
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Create Account'
        )}
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Or continue with
        </Typography>
      </Divider>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <IconButton 
            sx={{ 
              border: 1, 
              borderColor: 'divider',
              '&:hover': { bgcolor: 'action.hover' }
            }} 
            aria-label="google"
          >
            <GoogleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton 
            sx={{ 
              border: 1, 
              borderColor: 'divider',
              '&:hover': { bgcolor: 'action.hover' }
            }} 
            aria-label="facebook"
          >
            <FacebookIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton 
            sx={{ 
              border: 1, 
              borderColor: 'divider',
              '&:hover': { bgcolor: 'action.hover' }
            }} 
            aria-label="apple"
          >
            <AppleIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUp;