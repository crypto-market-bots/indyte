import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);



  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };
    
    // setValue((prevState) => ({


    // }));
    // console.log( value);
  

  const formData = new FormData();
  formData.append("email", value.email);
  formData.append("password", value.password);


  const handleClick = () => {
    console.log(value)
    axios
      .post("https://cineview.onrender.com/api/user/loginuser",  value )
      .then((res) => {

        localStorage.setItem("keep logged in", "true");
        localStorage.setItem("token", res.data.token);
        // sessionStorage.setItem("keep logged in", "false");
        // sessionStorage.setItem("token", res.data.token);
        navigate('/dashboard', { replace: true });


      })
      .catch((error) => {
        // Handle error response
        // notify(false, error.response.data.message);
        console.log(error);
      })
      .finally(() => {
        // console.log("Login done") // Set loading state to false regardless of success or failure
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
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
