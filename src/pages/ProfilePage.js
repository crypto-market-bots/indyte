import React from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const ProfileContainer = styled(Container)(({ theme }) => ({
  // marginTop: theme.spacing(4),
}));

const PersonInfoContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: 10,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row', // For larger screens, display in a row
    alignItems: 'center',
  },
}));

const DietitianAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
}));

const DietitianName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.8rem',
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(2), // For larger screens, add right margin
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: 10,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.dark,
  },
}));

const DietitianBio = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#666',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginBottom: 0, // For larger screens, remove the bottom margin
  },
}));

const PersonalInfoContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: 10,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));



const ProfilePage = () => {
  const user = useSelector((state) => state.slice.data.loggedInuserData);
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const totalCustomers = 10; // Total number of customers (You can change this value)
  const maxCustomers = 25; // Maximum allowed customers

  // Calculate the percentage of customers
  const customerPercentage = (totalCustomers / maxCustomers) * 100;

  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <ProfileContainer maxWidth="md">
      <Grid container spacing={2}>
        {/* Person Info Section */}
        <Grid item xs={12} md={12}>
          <PersonInfoContainer>
            <DietitianAvatar src={user?.profile_photo} alt="Person Image" />
            <Box ml={2}>
              <DietitianName variant="h6">
                {' '}
                {user.first_name}
                {user.last_name}
              </DietitianName>
              <DietitianBio variant="body1">{user.past_work_details}</DietitianBio>
            </Box>
            {/* <EditButton variant="outlined" color="primary" style={{ marginLeft: 'auto' }}>
              Edit
            </EditButton> */}
          </PersonInfoContainer>
        </Grid>

        {/* Personal Information Section */}
        <Grid item xs={12} md={12}>
          <PersonalInfoContainer>
            <Box display="flex" justifyContent={'space-between'}>
              <Typography variant="h6">Personal Information</Typography>
              {/* <EditButton variant="outlined" color="primary">
                Edit
              </EditButton> */}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Name"
                      secondary={`${user.first_name}${' '}${user.last_name}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Phone Number" secondary={user?.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Email" secondary={user?.email} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Qualification" secondary={user?.qualification} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Study Details" secondary={user?.study_details} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Customer (${totalCustomers})`}
                      secondary={
                        <>
                          <Box width="50%" mt={1} borderRadius={5} bgcolor="#ddd">
                            <Box
                              width={`${customerPercentage}%`}
                              borderRadius={5}
                              bgcolor="primary.main"
                              color="primary.contrastText"
                              textAlign="right"
                              p={0.5}
                            >
                              {/* {totalCustomers}/{maxCustomers} */}
                            </Box>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Height" secondary={user?.height} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Weight" secondary={user?.weight} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Experience" secondary={user?.experience} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </PersonalInfoContainer>
        </Grid>

        {/* ID Card Information Section */}
        <Grid item xs={12} md={12}>
          <PersonalInfoContainer>
            <Box display="flex" justifyContent={'space-between'}>
              <Typography variant="h6">ID Card Information</Typography>
              {/* <EditButton variant="outlined" color="primary">
                Edit
              </EditButton> */}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="ID Card Type" secondary={user?.id_card_type} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="ID Card Number" secondary={user?.id_card_number}/>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem button onClick={handleDialogOpen}>
                    <ListItemText primary="Document Picture" secondary="Click to view" />
                  </ListItem>
                </List>
              </Grid>
              {/* You can add more Grid items for more sections here */}
            </Grid>
          </PersonalInfoContainer>
        </Grid>

        {/* Guardian and Emergency Contact Section */}
        {/* <Grid item xs={12} md={12}>
          <PersonalInfoContainer>
            <Box display="flex" justifyContent={'space-between'}>
              <Typography variant="h6">Guardian and Emergency Contact</Typography>
              <EditButton variant="outlined" color="primary">
                Edit
              </EditButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Emergency Contact Name" secondary="Jane Doe" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Local Guardian Name" secondary="John Smith" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Relationship with Emergency Contact" secondary="Sibling" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Emergency Contact Phone Number" secondary="+9876543210" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Local Guardian Phone Number" secondary="+1234567890" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </PersonalInfoContainer>
        </Grid> */}

        {/* <Grid item xs={12} md={12}>
          <PersonalInfoContainer>
            <Box display="flex" justifyContent={'space-between'}>
              <Typography variant="h6">Additional Information</Typography>
              <EditButton variant="outlined" color="primary">
                Edit
              </EditButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Specializations/Expertise" secondary="Diet Planning, Weight Management" />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Certifications and Licenses"
                      secondary="Certified Dietitian (CD), Licensed Nutritionist"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Awards and Achievements"
                      secondary="Best Dietitian Award 2021, Nutrition Excellence Award"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Languages Spoken" secondary="English, Spanish" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Professional Memberships"
                      secondary="American Dietetic Association (ADA), International Society of Sports Nutrition (ISSN)"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </PersonalInfoContainer>
        </Grid> */}

         {/* Address Section */}
         <Grid item xs={12} md={12}>
          <PersonalInfoContainer>
            <Box display="flex" justifyContent={'space-between'}>
              <Typography variant="h6">Local Address</Typography>
              {/* <EditButton variant="outlined" color="primary">
                Edit
              </EditButton> */}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Address Line 1" secondary={user?.local_address?.address_line1} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Address Line 2" secondary={user?.local_address?.address_line2} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="City" secondary={user?.local_address?.city} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="State" secondary={user?.local_address?.state} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ZIP Code" secondary={user?.local_address?.zip} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Country" secondary={user?.local_address?.country} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </PersonalInfoContainer>
        </Grid>

         {/* Local Guardian Address Section */}
         <Grid item xs={12} md={12}>
          <PersonalInfoContainer>
            <Box display="flex" justifyContent={'space-between'}>
              <Typography variant="h6">Local Guardian Address</Typography>
              {/* <EditButton variant="outlined" color="primary">
                Edit
              </EditButton> */}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Address Line 1" secondary={user?.local_guardian_address?.address_line1} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Address Line 2" secondary={user?.local_guardian_address?.address_line2} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="City" secondary={user?.local_guardian_address?.city} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="State" secondary={user?.local_guardian_address?.state} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ZIP Code" secondary={user?.local_guardian_address?.zip} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Country" secondary={user?.local_guardian_address?.country} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </PersonalInfoContainer>
        </Grid>

        {/* Permanent Address Section */}
        <Grid item xs={12} md={12}>
          <PersonalInfoContainer>
            <Box display="flex" justifyContent={'space-between'}>
              <Typography variant="h6">Permanent Address</Typography>
              {/* <EditButton variant="outlined" color="primary">
                Edit
              </EditButton> */}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Address Line 1" secondary={user?.permanent_address?.address_line1} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Address Line 2" secondary={user?.permanent_address?.address_line2} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="City" secondary={user?.permanent_address?.city} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText primary="State" secondary={user?.permanent_address?.state} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ZIP Code" secondary={user?.permanent_address?.zip} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Country" secondary={user?.permanent_address?.country} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </PersonalInfoContainer>
        </Grid>

      </Grid>

      {/* Dialog for Document Picture */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Document Picture</DialogTitle>
        <DialogContent>
          {/* Replace 'document_picture.jpg' with the actual URL of the document picture */}
          <img
            src={user?.id_card_photo}
            alt="Document"
            style={{ maxWidth: '100%', maxHeight: 400 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  );
};

export default ProfilePage;
