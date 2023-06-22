import React from 'react';
import { styled } from '@mui/system';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const ForgotPasswordContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const ForgotPasswordPaper = styled(Paper)({
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: 'white',
  maxWidth: 430,
  maxHeight: 600,
  borderRadius: 15,
});

const ForgotPasswordImage = styled('div')(({ theme }) => ({
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ForgotPasswordTextField = styled(TextField)({
  margin: '1rem 0',
});

const SendButton = styled(Button)(({ theme }) => ({
  margin: '1rem 0',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius: 20,
  padding: '1rem 2rem',
  fontWeight: 'bold',
}));

const ReturnToSignIn = styled(Typography)(({ theme }) => ({
  marginTop: '1rem',
  '& a': {
    color: "#000",
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordContainer>
      <ForgotPasswordPaper elevation={4}>
        <ForgotPasswordImage>
          <img
            src="https://img.freepik.com/premium-vector/padlock-lock-security-safety-encryption-protection-privacy-concept-3d-vector-icon-cartoon-minimal-style_365941-763.jpg"
            alt="logo"
            width={150}
            height={150}
          />
        </ForgotPasswordImage>
        <Typography variant="h3">Forgot your password?</Typography>
        <Typography variant="body2">
          Please enter the email address associated with your account and we
          will email you a link to reset your password.
        </Typography>
        <ForgotPasswordTextField
          label="Email Address"
          variant="outlined"
          fullWidth
        />
        <SendButton variant="contained" fullWidth>
          Send Request
        </SendButton>
        <ReturnToSignIn>
          &lt; <a href="/login">Return to Sign In</a>
        </ReturnToSignIn>
      </ForgotPasswordPaper>
    </ForgotPasswordContainer>
  );
};

export default ForgotPasswordPage;
