import React, { useState } from 'react';
import { Box, Button, Rating, TextField, Typography, Stack, Alert } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import api from '../../services/api'; // Assuming your API service is set up

interface CoachReviewFormProps {
    coachId: string;
    onReviewSubmitted?: () => void; // Optional callback after successful submission
}

const CoachReviewForm: React.FC<CoachReviewFormProps> = ({ coachId, onReviewSubmitted }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (rating === null || rating === 0) {
            setError('Rating is required.');
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post('/coach-reviews', {
                coachId,
                rating,
                comment,
            });
            setSuccess('Review submitted successfully!');
            setRating(null);
            setComment('');
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p:3, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                Leave a Review
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="legend" variant="subtitle1" sx={{ mr: 2, fontWeight: 'bold' }}>Your Rating*:</Typography>
                    <Rating
                        name="coach-rating"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </Box>
                <TextField
                    label="Your Comment (Optional)"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || rating === null || rating === 0}
                    sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
            </Stack>
        </Box>
    );
};

export default CoachReviewForm; 