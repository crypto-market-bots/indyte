import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import typography from '@material-ui/core/typography';
import { Typography } from '@mui/material';
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
          display:"flex",
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom right, #80B5B9,#B6B6A217)',
          borderRadius: '25px',
        }}
      >
        <img
          src={"/assets/images/person.png"}
          loading="lazy"
          alt="nothing"
          style={{ height: '400px', }}
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