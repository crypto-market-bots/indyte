import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import OTPInput from 'otp-input-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  position:"relative",
  maxWidth: 430,
  maxHeight: 700,
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

const OTPContainer = styled('div')({
  marginTop: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const OTPInputContainer = styled(OTPInput)({
  '& input': {
    height: '100%',
    fontSize: '1.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    margin: '0 0.5rem',
    textAlign: 'center',
    outline: 'none',
  },
});

const ResetPasswordTextField = styled(TextField)({
  margin: '1rem 0',
});

const UpdatePasswordButton = styled(Button)(({ theme }) => ({
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

const ForgotPasswordPage = () => {
  const [otp, setOtp] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSendRequest = () => {
    setIsEmailSent(true);
  };

  const handleVerify = () => {
    setIsVerificationSent(true);
    // Handle verifying the OTP
  };

  const handleUpdatePassword = () => {
    // Handle updating the password
  };

  const handleGoBack = () => {
    if (isVerificationSent && isEmailSent){
      setIsVerificationSent(false);
    }else{
      setIsEmailSent(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordPaper elevation={4}>
        {(isVerificationSent || isEmailSent) && (
          <BackButton  onClick={handleGoBack}>
            <ArrowBackIcon />
          </BackButton>
        )}
        <ForgotPasswordImage>
          <img
            src="https://img.freepik.com/premium-vector/padlock-lock-security-safety-encryption-protection-privacy-concept-3d-vector-icon-cartoon-minimal-style_365941-763.jpg"
            alt="logo"
            width={150}
            height={150}
          />
        </ForgotPasswordImage>
        {(isEmailSent && isVerificationSent ) &&
          <>
            <Typography variant="h3">Reset Your Password</Typography>
            <Typography variant="body2">
              Please enter your new password and confirm it to reset your password.
            </Typography>
            <ResetPasswordTextField
              label="New Password"
              variant="outlined"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <ResetPasswordTextField
              label="Confirm New Password"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <UpdatePasswordButton variant="contained" fullWidth onClick={handleUpdatePassword}>
              Update Password
            </UpdatePasswordButton>
          </>}
         {(isEmailSent && !isVerificationSent ) && (
          <>
            <Typography variant="h3">Verify your OTP</Typography>
            <Typography variant="body2">Please enter the OTP you received to verify your account.</Typography>
            <OTPContainer>
              <OTPInputContainer
                value={otp}
                onChange={handleOtpChange}
                autoFocus
                OTPLength={4}
                otpType="number"
                secure
              />
            </OTPContainer>
            <SendButton variant="contained" fullWidth onClick={handleVerify}>
              Verify
            </SendButton>
          </>)}
          {(!isEmailSent && !isVerificationSent )&&(
          <>
            <Typography variant="h3">Forgot your password?</Typography>
            <Typography variant="body2">
              Please enter the email address associated with your account and we will email you a link to reset your
              password.
            </Typography>
            <ForgotPasswordTextField label="Phone No." variant="outlined" fullWidth />
            <SendButton variant="contained" fullWidth onClick={handleSendRequest}>
              Send Request
            </SendButton>
          </>)}
        <ReturnToSignIn>
        &lt; <a href="/login">Return to Sign In</a>
        </ReturnToSignIn>
      </ForgotPasswordPaper>
    </ForgotPasswordContainer>
  );
};

export default ForgotPasswordPage;
