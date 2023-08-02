import React from 'react'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons;-material/Settings';
import Logout from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
// import typography from '@material-ui/core/typography';
import { Typography } from '@mui/material'
import SemiCircleProgressBar from 'react-progressbar-semicircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Runningimage from '../Running.png'
import ProgressImages from '../Person_data.svg'
import BreakFast from '../breakfast.svg'
import Lunch from '../lunch.svg'
import Dinner from '../Dinner.svg'
import arrow from '../arrow.svg'
import ImagesTracker from './ImagesTracker';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
];

export default function ProgressTracker() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Autocomplete
                disablePortal
                value="Mohit"
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300, m: 1 }}
                renderInput={(params) => <TextField {...params} label="Customer" />}
              />
            </div>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Item>
        </Grid>
        <Grid item xs={4.5} spacing={3} sx={{ height: '500px', backgroundColor: 'transparent' }}>
          <div style={{ border: '2px solid black', display: 'grid' }}>
            <div style={{ border: '2px solid blue', display: 'flex' }}>
              <div style={{ border: '2px solid red', padding: '4px', width: '50%' }}>x</div>
              <div style={{ border: '2px solid red', padding: '4px', width: '50%' }}>x</div>
            </div>
            <div style={{ border: '2px solid black', display: 'flex' }}>
              <div style={{ border: '2px solid yellow', padding: '4px', width: '50%' }}>xs</div>
              <div style={{ border: '2px solid yellow', padding: '4px', width: '50%' }}>x</div>
            </div>
          </div>
          <Item
            sx={{
              height: '80px',
              m: 1,
              backgroundColor: '#B19D9D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Avatar alt="Remy Sharp" src={Lunch} sx={{ m: 1 }} />
            <Typography variant="h6" component="h1" sx={{ color: '#04297A' }}>
              Lunch
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt="Remy Sharp" src={arrow} sx={{ m: 1 }} />
              </IconButton>
            </Tooltip>
          </Item>
          <Item
            sx={{
              height: '80px',
              m: 1,
              backgroundColor: '#B19D9D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Avatar alt="Remy Sharp" src={Lunch} sx={{ m: 1 }} />
            <Typography variant="h6" component="h1" sx={{ color: '#04297A' }}>
              Lunch
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt="Remy Sharp" src={arrow} sx={{ m: 1 }} />
              </IconButton>
            </Tooltip>
          </Item>
          <Item
            sx={{
              height: '80px',
              m: 1,
              backgroundColor: '#888DA1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Avatar alt="Remy Sharp" src={Dinner} sx={{ m: 1 }} />
            <Typography variant="h6" component="h1" sx={{ color: '#04297A' }}>
              Dinner
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt="Remy Sharp" src={arrow} sx={{ m: 1 }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 40,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
            </Menu>
          </Item>
        </Grid>
        {/* Images_tracker */}
        <Grid item xs={4.5} sx={{ height: '600px', backgroundColor: 'white', borderRadius: '25px' }}>
          <Item
            sx={{
              height: '100%',
            }}
          >
            <ImagesTracker />
          </Item>
        </Grid>
        <Grid item xs={3} sx={{ height: '600px' }}>
          <Item sx={{ height: '33%', m: 1, backgroundColor: '#9099B7' }}>
            <SemiCircleProgressBar percentage={33} showPercentValue strokeWidth="30" stroke="#4B9BFF" />
          </Item>
          <Item sx={{ height: '33%', m: 1, backgroundColor: '#9099B7', display: 'flex' }}>
            <img
              src={Runningimage}
              loading="lazy"
              alt="nothing"
              style={{ height: '100px', width: '100px', alignItems: 'center', justifyContent: 'center' }}
            />
          </Item>
          <Item sx={{ height: '33%', m: 1, backgroundColor: '#9099B7' }}>
            <SemiCircleProgressBar percentage={33} showPercentValue strokeWidth="30" stroke="#4B9BFF" />
          </Item>

          {/* <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'grey', height: '33%' }}>
              hello mohit here
            </div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'blue', height: '33%' }}>
              hello mohit here
            </div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'yellow', height: '33%' }}>
              hello mohit here
            </div>  */}
        </Grid>
      </Grid>
    </Box>
  );
}
