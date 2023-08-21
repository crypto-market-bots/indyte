import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { toast } from 'react-hot-toast';
import api from '../../../api';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };

  const formData = new FormData();
  formData.append('email', value.email);
  formData.append('password', value.password);

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleClick = () => {
    console.log(value);
    setLoading(true);
    api
      .post('/login-user', formData)
      .then((res) => {
        localStorage.setItem('keep logged in', 'true');
        localStorage.setItem('token', res.data.token);
        toast.success('login successfully');
        navigate('/dashboard/crm', { replace: true });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
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

      <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
