import React from 'react'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import typography from '@material-ui/core/typography';
import { Typography } from '@mui/material';
import SemiCircleProgressBar from 'react-progressbar-semicircle';
import Runningimage from '../Running.png';
import ProgressImages from '../Person_data.svg';
import BreakFast from '../breakfast.svg';
import Lunch from '../lunch.svg';
import Dinner from '../Dinner.svg';
import arrow from '../arrow.svg';
// import { Height } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ImagesTracker() {
  return (
    <Box sx={{ flexGrow: 1, height: '100%' }}>
      <Item
        sx={{
          height: '10%',
          m: 1,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: '#04297A' }}>
          Front
        </Typography>
        <Typography variant="h6" component="h2">
          Back
        </Typography>
        <Typography variant="h6" component="h2">
          Right
        </Typography>
        <Typography variant="h6" component="h2">
          Left
        </Typography>
      </Item>
      <Item
        sx={{
          height: '80%',
          m: 1,
          // backgroundColor: 'gray',
          backgroundImage: 'linear-gradient(to bottom right, #80B5B9,#B6B6A217)',
          borderRadius: '25px',
        }}
      >
        <img
          src={ProgressImages}
          loading="lazy"
          alt="nothing"
          style={{ height: '320px', width: '320px', alignItems: 'center', justifyContent: 'center' }}
        />
      </Item>
      <Item
        sx={{
          height: '',
          m: 1,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component="h2">
          Height - 6.3ft
        </Typography>
        <Typography variant="h6" component="h2">
          Height - 6.3ft
        </Typography>
      </Item>
    </Box>
  );
}
