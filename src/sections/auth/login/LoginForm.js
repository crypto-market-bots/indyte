import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { toast } from 'react-hot-toast';
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/utils/apiCalls';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    email: '',
    password: '',
    type: 'web',
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleLogin = async () => {
    let usertype, token;
    // here we are using .then instead of useSelector because sometime useselector give us previous response value
    await dispatch(login(value)).then((res) => {
      usertype = res.payload?.data?.type;
      token = res.payload?.token;
    });
    localStorage.setItem('keep logged in', 'true');
    localStorage.setItem('token', token);
    if (token) {
      navigate(`/dashboard/${usertype === 'admin' ? 'crm' : 'dietitian'}`);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" value={value.email} onChange={handlechange} label="Email address" />

        <TextField
          name="password"
          value={value.password}
          onChange={handlechange}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link component="button" onClick={handleForgotPassword}>
          Forgot password
        </Link>
      </Stack>

      <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
    </>
  );
}
