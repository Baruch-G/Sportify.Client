import { styled } from '@mui/material/styles';
import { Paper, Avatar, Box } from '@mui/material';

export const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0 8px 24px rgba(227, 113, 39, 0.15)'
    }
}));

export const LargeAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(2),
    border: '4px solid',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 4px 12px rgba(227, 113, 39, 0.2)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)'
    }
}));

export const InfoBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    height: '100%',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -8,
        left: 0,
        width: 40,
        height: 4,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 2
    }
}));

export const InfoLabel = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 500,
    marginBottom: theme.spacing(0.5)
}));

export const InfoValue = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary
}));

export const StyledChip = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    fontSize: '0.875rem',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        transform: 'translateY(-2px)'
    }
}));

export const ContactBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'translateX(4px)'
    }
}));

export const RatingBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiRating-root': {
        color: theme.palette.primary.main
    }
}));

export const ActionButton = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 2px 8px rgba(227, 113, 39, 0.2)',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(227, 113, 39, 0.3)'
    }
})); 