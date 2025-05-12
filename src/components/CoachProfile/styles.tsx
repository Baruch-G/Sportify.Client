import { styled } from '@mui/material/styles';
import { Paper, Avatar } from '@mui/material';

export const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

export const LargeAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(2),
})); 