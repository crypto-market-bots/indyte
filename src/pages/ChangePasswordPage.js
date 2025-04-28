import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChangePasswordContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const ChangePasswordPaper = styled(Paper)({
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: 'white',
  position: "relative",
  maxWidth: 430,
  maxHeight: 700,
  borderRadius: 15,
});

const ChangePasswordImage = styled('div')(({ theme }) => ({
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ChangePasswordTextField = styled(TextField)({
  margin: '1rem 0',
});

const ChangePasswordButton = styled(Button)(({ theme }) => ({
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
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: '1rem',
  padding: '0.5rem',
  color: "black",
  minWidth: 'auto',
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  alignSelf: 'flex-start', // Align the button to the top left corner
}));

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    // Handle updating the password
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (newPassword.length < 6) {
      setError('Password should be at least 6 characters long.');
    } else {
      // Password meets all validation criteria, proceed with updating the password
      setError('');
      console.log('Password updated!');
    }
  };

  const handleGoBack = () => {
    // Handle going back to the previous page
    console.log('Go back to previous page');
  };

  return (
    <ChangePasswordContainer>
      <ChangePasswordPaper elevation={4}>
        <BackButton onClick={handleGoBack}>
          <ArrowBackIcon />
        </BackButton>

        <ChangePasswordImage>
          <img
            src="https://img.freepik.com/premium-vector/padlock-lock-security-safety-encryption-protection-privacy-concept-3d-vector-icon-cartoon-minimal-style_365941-763.jpg"
            alt="logo"
            width={100}
            height={100}
          />
        </ChangePasswordImage>
        <Typography variant="h4">Change Your Password</Typography>
        <ChangePasswordTextField
          label="Current Password"
          variant="outlined"
          type="password"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <ChangePasswordTextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <ChangePasswordTextField
          label="Confirm New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" component="p">
            {error}
          </Typography>
        )}
        <ChangePasswordButton variant="contained" fullWidth onClick={handleChangePassword}>
          Change Password
        </ChangePasswordButton>
      </ChangePasswordPaper>
    </ChangePasswordContainer>
  );
};

export default ChangePasswordPage;
