import React from 'react';
import { Stepper, Step, StepLabel, StepIconProps, Paper, Box } from '@mui/material';
import { Check } from '@mui/icons-material';
import SignUp from './SignUp';
import SportsPreferencesSetup from './SportsPreferencesSetup';
import MoreInfo from './MoreUserInfoSIgnUp';
import ProfileImageUpload from './ProfileImageUpload';
const steps = ['Sign In', 'More Info', 'Profile Photo', 'Customization'];
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

function StepperSignIn() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [token, setToken] = React.useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                py: 4
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 4 },
                    maxWidth: 800,
                    width: "100%",
                    mx: { xs: 2, sm: 4 },
                    borderRadius: 2
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: { xs: "auto", sm: 600 },
                    gap: 4
                }}>
                    <Box sx={{ flex: 1 }}>
                        {activeStep === 0 && <SignUp onSubmit={(formData) => {
                            setEmail(formData.email);
                            setToken(formData.token);
                            setActiveStep(1);
                        }} />}
                        {activeStep === 1 && <SportsPreferencesSetup email={email} onSubmit={() => setActiveStep(2)} />}
                        {activeStep === 2 && (
                            <ProfileImageUpload
                                token={token}
                                onSubmit={(imageUrl?: string) => {
                                    setActiveStep(3);
                                }}
                            />
                        )}
                        {activeStep === 3 && <MoreInfo email={email} onSubmit={() => navigate("/")} />}
                    </Box>

                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{
                            mt: "auto",
                            pt: 2,
                            borderTop: 1,
                            borderColor: "divider"
                        }}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Paper>
        </Box>
    );
}

export default StepperSignIn;