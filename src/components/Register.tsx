import React from 'react';
import {Stepper,Step,StepLabel,StepIconProps,Paper} from '@mui/material';
import { Check } from '@mui/icons-material';
import SignUp from './SignUp';
import SportsPreferencesSetup from './SportsPreferencesSetup';
import MoreInfo from './MoreUserInfoSIgnUp';
const steps = ['Sign In','More Info' ,'Customization'];
import { useNavigate } from "react-router-dom";

const CustomIcon: React.FC<StepIconProps> = ({ active, completed, icon, error }) => { // Change to StepIconProps
    const contents = completed ? <Check fontSize="inherit" /> : icon;
   
    return (
        <div
            style={{
                backgroundColor: active || completed ? "#E5461D" : "gray",
                color: "white",
                minHeight: "35px",
                minWidth: "35px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
                fontSize: "1rem",
            }}
        >
            {contents}
        </div>
    );
};

function StepperSignIn() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f5f5f5"
            }}
        >
            <Paper elevation={3} style={{ padding: 32, maxWidth: 800, width: "100%", margin: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", minHeight: 600 }}>
                    <div style={{ flex: 1 }}>
                        {activeStep === 0 && <SignUp  onSubmit={(formData) => {
                                    setEmail(formData.email);
                                    setActiveStep(1);
                                }} />}
                        {activeStep === 1 && <MoreInfo email ={email} onSubmit={() => setActiveStep(2) } />}
                        {activeStep === 2 && <SportsPreferencesSetup email ={email} onSubmit={() => navigate("/") }/>}
                    </div>
                    <Stepper activeStep={activeStep} alternativeLabel style={{ marginTop: "auto" }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={CustomIcon} sx={{ color: 'red' }}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </Paper>
        </div>
    );
}

export default StepperSignIn;