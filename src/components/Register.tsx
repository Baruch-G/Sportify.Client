import React from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    StepIconProps, // Import StepIconProps
} from '@mui/material';
import { Check } from '@mui/icons-material';
import SignUp from './SignUp';
import SportsPreferencesSetup from './SportsPreferencesSetup';

const steps = ['Sign In', 'Customization'];

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

    return (
        <div>
            <div style={{ height: "700px" }}>
                {activeStep === 0 && <SignUp onSubmit={() => setActiveStep(1)} />}
                {activeStep === 1 && <SportsPreferencesSetup onSubmit={() => setActiveStep(1)} />}
            </div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={CustomIcon} sx={{ color: 'red' }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

export default StepperSignIn;