import React from 'react';
import { Box, Typography, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { User } from '../../models/User';

interface ContactInformationProps {
    userData: User;
    open: boolean;
    onClose: () => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ userData, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Contact Information
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {userData.firstName} {userData.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={userData.email}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={userData.phoneNumber || 'Not provided'}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Preferred Contact Method
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userData.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                        // Here you can add logic to initiate contact
                        window.location.href = `mailto:${userData.email}`;
                    }}
                >
                    Contact Now
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContactInformation; 