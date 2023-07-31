import React from 'react';
import { Avatar, Button, Container, Grid, Box, Typography, List, ListItem, ListItemText, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    borderRadius:10,
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
                        <DietitianAvatar src="/assets/images/avatars/avatar_1.jpg" alt="Person Image" />
                        <Box ml={2}>
                            <DietitianName variant="h6">John Doe</DietitianName>
                            <DietitianBio variant="body1">
                                Dietitian | Fitness Enthusiast | Helping people achieve their health goals.
                            </DietitianBio>
                        </Box>
                        <EditButton variant="outlined" color="primary" style={{marginLeft:"auto"}}>Edit</EditButton>

                    </PersonInfoContainer>
                </Grid>

                {/* Personal Information Section */}
                <Grid item xs={12} md={12}>
                    <PersonalInfoContainer>
                        <Box display="flex" justifyContent={"space-between"}>
                            <Typography variant="h6">Personal Information</Typography>
                            <EditButton variant="outlined" color="primary">Edit</EditButton>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Name" secondary="Vishnu Sony" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Phone Number" secondary="[Phone Number here]" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Email" secondary="[Email here]" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Qualification" secondary="[Qualification here]" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Study Details" secondary="[Study Details here]" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Customer (${totalCustomers})`} secondary={
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
                                        } />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Height" secondary="[Height here]" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Weight" secondary="[Weight here]" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Experience" secondary="[Experience here]" />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </PersonalInfoContainer>
                </Grid>

                {/* ID Card Information Section */}
                <Grid item xs={12} md={12}>
                    <PersonalInfoContainer>
                    <Box display="flex" justifyContent={"space-between"}>
                            <Typography variant="h6">ID Card Information</Typography>
                            <EditButton variant="outlined" color="primary">Edit</EditButton>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="ID Card Type" secondary="Pan Card" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="ID Card Number" secondary="ABCD1234XYZ" />
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
                <Grid item xs={12} md={12}>
                    <PersonalInfoContainer>
                    <Box display="flex" justifyContent={"space-between"}>
                            <Typography variant="h6">Guardian and Emergency Contact</Typography>
                            <EditButton variant="outlined" color="primary">Edit</EditButton>
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
                </Grid>


                <Grid item xs={12} md={12}>
                    <PersonalInfoContainer>
                    <Box display="flex" justifyContent={"space-between"}>
                            <Typography variant="h6">Additional Information</Typography>
                            <EditButton variant="outlined" color="primary">Edit</EditButton>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Specializations/Expertise" secondary="Diet Planning, Weight Management" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Certifications and Licenses" secondary="Certified Dietitian (CD), Licensed Nutritionist" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Awards and Achievements" secondary="Best Dietitian Award 2021, Nutrition Excellence Award" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Languages Spoken" secondary="English, Spanish" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Professional Memberships" secondary="American Dietetic Association (ADA), International Society of Sports Nutrition (ISSN)" />
                                    </ListItem>
                                    {/* Add more ListItem components for more fields */}
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
                    <img src="https://cdn.pixabay.com/photo/2022/11/09/00/44/aadhaar-card-7579588_960_720.png" alt="Document" style={{ maxWidth: '100%', maxHeight: 400 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </ProfileContainer>
    );
};

export default ProfilePage;