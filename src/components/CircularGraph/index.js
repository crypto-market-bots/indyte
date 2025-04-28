import styled from '@emotion/styled';
import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import SemiCircleProgressBar from 'react-progressbar-semicircle';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const containerStyle = {
  height: '35%',
  width: '100%',
  padding: '15px',
  border: '1px solid black',
  backgroundColor: 'white',
  // marginTop:3,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  flexDirection: 'column',
  position: 'relative',
};

// Custom styles for the consumed and remaining labels
const labelStyle = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'black',
  position: 'absolute',
  textAlign: 'center',
};

// Custom styles for the consumed label
const TargetLabelStyle = {
  top: '83%',
  left: '22%',
  transform: 'translate(-50%, -50%)',
};
const AchievedLabelStyle = {
  top: '83%',
  right: '23%',
  transform: 'translate(50%, -50%)',
};

const CircularGraph = ({ Heading, percentage, Target, Achieved }) => {
  return (
    <Item sx={containerStyle}>
      <div>
        <Typography textAlign={'left'} variant="subtitle1">
          {Heading}
        </Typography>
      </div>
      <SemiCircleProgressBar percentage={percentage} showPercentValue strokeWidth="30" stroke="#4B9BFF" />
      <div style={{ ...labelStyle, ...TargetLabelStyle }}>
        <Typography variant="subtitile2">Target</Typography>
        <br />
        <Typography variant="caption">{Target}</Typography>
      </div>
      <div style={{ ...labelStyle, ...AchievedLabelStyle }}>
        <Typography variant="subtitile2">Achieved</Typography>
        <br />
        <Typography variant="caption">{Achieved}</Typography>
      </div>
    </Item>
  );
};

export default CircularGraph;
