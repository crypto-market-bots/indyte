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
// import Runningimage from '../Running.png'
// import ProgressImages from '../Person_data.svg'
// import BreakFast from '../breakfast.svg'
// import Lunch from '../lunch.svg'
// import Dinner from '../Dinner.svg'
// import arrow from '../arrow.svg'
import "../styles/card.css"
import ImagesTracker from './ImageTracker';

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


const data = [
  {
    color: '#FFF7CD',
    supplement: 'Protein',
    quantity: '10g',
    image: 'protein-image.jpg',
  },
  {
    color: '#FFE7D9',
    supplement: 'Sugar',
    quantity: '20g',
    image: 'sugar-image.jpg',
  },
  {
    color: '#D0F2FF',
    supplement: 'Fat',
    quantity: '5g',
    image: 'fat-image.jpg',
  },
  {
    color: '#C1F2E1',
    supplement: 'Water',
    quantity: '100ml',
    image: 'water-image.jpg',
  },
];

const styles = {
  cardContainer: {
    height: '500px',
    backgroundColor: 'transparent',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    border: '2px solid black',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '8px',
    borderBottom: '1px solid #ccc',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
};

export default function ProgressTracker() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };

   // Calculate the percentage based on consumed and remaining values (0 to 300)
  const total = 300;
  const percentage = (230 / total) * 100;

  
  // Custom styles for the container
  const containerStyle = {
    height: '35%',
    padding:'15px',
    backgroundColor: 'white',
    // marginTop:3,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
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
  const consumedLabelStyle = {
    top: '83%',
    left: '22%',
    transform: 'translate(-50%, -50%)',
  };

  // Custom styles for the remaining label
  const remainingLabelStyle = {
    top: '83%',
    right: '23%',
    transform: 'translate(50%, -50%)',
  };

    // Custom styles for the value (270)
    const valueStyle = {
      position: 'absolute',
      textAlign: 'center',
    };
  
    // Custom styles for the value position (where percentage was previously displayed)
    const valuePositionStyle = {
      top: '60%',
      transform: 'translateY(-50%)',
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
            <Typography variant="body1" sx={{ color: '#707070', mr: 2,border:'2px solid #ccc',padding:'4px 10px 4px 10px',borderRadius:10 }}>
              {new Date().toLocaleDateString()}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4.5} spacing={3} sx={{ height: '500px', backgroundColor: 'transparent' }}>
          <div style={{  display: 'grid', margin: '0px 10px 0px 2px',rowGap:10 }}>
            <div style={{ display: 'flex',columnGap:10 }}>
              <div style={{width:'50%'}} >
                <div className="card" style={{background:'#FFF7CD',color: "#7A4F01"}}>
                  <div className='center'>
                    <div className="header">protein</div>
                    <div className="quantity">15gm</div>
                  </div>
                  <div className="image">
                    <img src="/assets/images/protein.png" alt=""  />
                  </div>
                </div>
              </div>
              <div style={{width:'50%'}} >
                <div className="card" style={{background:'#FFE7D9',color: "#7A0C2E"}}>
                  <div className='center'>
                    <div className="header">Sugar</div>
                    <div className="quantity">15gm</div>
                  </div>
                  <div className="image">
                    <img src="/assets/images/sugar.png" alt=""  />
                  </div>
                </div>
              </div>
              
            </div>
            <div style={{ display: 'flex',columnGap:10 }}>
              <div style={{width:'50%'}} >
                <div className="card" style={{background:'#D0F2FF',color: "#04297A"}}>
                  <div className='center'>
                    <div className="header">Fat</div>
                    <div className="quantity">15gm</div>
                  </div>
                  <div className="image">
                    <img src="/assets/images/fat.png" width={20} height={20} alt=""  />
                  </div>
                </div>
              </div>
              <div style={{width:'50%'}} >
                <div className="card" style={{background:'#C1F2E1',color: "#2C5931"}}>
                  <div className='center'>
                    <div className="header">Water</div>
                    <div className="quantity">15gm</div>
                  </div>
                  <div className="image">
                    <img src="/assets/images/water.png" alt=""  />
                  </div>
                </div>
              </div>
              
            </div>
           
          </div>
          <Item
            sx={{
              height: '80px',
              m: 1,
              backgroundColor: '#CDCACA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Avatar alt="Remy Sharp" src={'/assets/images/breakfast.png'} sx={{ m: 1 }} />
            <Typography variant="h6" component="h1" sx={{ color: '#04297A' }}>
              Breakfast
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
                <Avatar alt="Remy Sharp" src={"/assets/images/arrow.png"} sx={{ m: 1 }} />
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
            <Avatar alt="Remy Sharp" src={"/assets/images/lunch.png"} sx={{ m: 1 }} />
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
                <Avatar alt="Remy Sharp" src={"/assets/images/arrow.png"} sx={{ m: 1 }} />
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
            <Avatar alt="Remy Sharp" src={"/assets/images/dinner.png"} sx={{ m: 1 }} />
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
                <Avatar alt="Remy Sharp" src={"/assets/images/arrow.png"} sx={{ m: 1 }} />
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
            <ImagesTracker/>
          </Item>
        </Grid>
        <Grid item xs={3} sx={{ height: '600px'}} >
          <Item sx={containerStyle}>
            <div>
              <Typography textAlign={"left"}  variant='subtitle1'>Calories</Typography>
            </div>
            <SemiCircleProgressBar percentage={70} showPercentValue strokeWidth="30" stroke="#4B9BFF" />
            <div style={{ ...labelStyle, ...consumedLabelStyle }}>
            {/* <Typography variant='caption' color={"GrayText"}  >0</Typography><br/> */}
            <Typography variant='subtitile2' >Consumed </Typography><br/>
            <Typography variant='caption'>230</Typography>
            </div>
            <div style={{ ...labelStyle, ...remainingLabelStyle }}>
            {/* <Typography variant='caption' color={"GrayText"} >300</Typography><br/> */}
            <Typography variant='subtitile2' >Remaining</Typography><br/>
            <Typography variant='caption' >70</Typography>
            </div>
            {/* <Typography style={{ ...valueStyle, ...valuePositionStyle }} variant='caption'>270</Typography> */}
          </Item>
          <Item sx={containerStyle} style={{marginTop:4}}>
            <div>
              <Typography textAlign={"left"}  variant='subtitle1'>Step</Typography>
            </div>
            <img
              src={"/assets/images/running.png"}
              loading="lazy"
              alt="nothing"
              style={{ height: '100px', width: '100px', alignItems: 'center', justifyContent: 'center' }}
            />
            <div style={{ ...labelStyle, ...consumedLabelStyle }}>
            {/* <Typography variant='caption' color={"GrayText"}  >0</Typography><br/> */}
            <Typography variant='subtitile2' >Total</Typography><br/>
            <Typography variant='caption'>2000</Typography>
            </div>
            <div style={{ ...labelStyle, ...remainingLabelStyle }}>
            {/* <Typography variant='caption' color={"GrayText"} >300</Typography><br/> */}
            <Typography variant='subtitile2' >Target</Typography><br/>
            <Typography variant='caption' >5000</Typography>
            </div>
            {/* <Typography style={{ ...valueStyle, ...valuePositionStyle }} variant='caption'>270</Typography> */}
          </Item>
          <Item sx={containerStyle} style={{marginTop:4}}>
            <div>
              <Typography textAlign={"left"}  variant='subtitle1'>Water</Typography>
            </div>
            <SemiCircleProgressBar percentage={70} showPercentValue strokeWidth="30" stroke="#4B9BFF" />
            <div style={{ ...labelStyle, ...consumedLabelStyle }}>
            {/* <Typography variant='caption' color={"GrayText"}  >0</Typography><br/> */}
            <Typography variant='subtitile2' >Consumed </Typography><br/>
            <Typography variant='caption'>2L</Typography>
            </div>
            <div style={{ ...labelStyle, ...remainingLabelStyle }}>
            {/* <Typography variant='caption' color={"GrayText"} >300</Typography><br/> */}
            <Typography variant='subtitile2' >Remaining</Typography><br/>
            <Typography variant='caption' >1L</Typography>
            </div>
            {/* <Typography style={{ ...valueStyle, ...valuePositionStyle }} variant='caption'>270</Typography> */}
          </Item>
          {/* <Item sx={{ height: '33%', m: 1, backgroundColor: '#9099B7' }}>
            <SemiCircleProgressBar percentage={33} showPercentValue strokeWidth="30" stroke="#4B9BFF" />
          </Item> */}

        
        </Grid>
      </Grid>
    </Box>
  );
}
