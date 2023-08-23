// import React from 'react';
// import {
//   Avatar,
//   Button,
//   Container,
//   Grid,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const ProfileContainer = styled(Container)(({ theme }) => ({
//   marginTop: theme.spacing(4),
// }));

// const PersonInfoContainer = styled(Box)(({ theme }) => ({
//   border: '1px solid #e0e0e0',
//   borderRadius: theme.spacing(2),
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(3),
//   display: 'flex',
//   alignItems: 'center',
// }));

// const DietitianAvatar = styled(Avatar)(({ theme }) => ({
//   width: theme.spacing(16),
//   height: theme.spacing(16),
// }));

// const DietitianName = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   fontSize: '1.5rem',
//   color: theme.palette.primary.main,
//   marginLeft: theme.spacing(2),
// }));

// const EditButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.primary.main,
//   borderRadius: theme.spacing(2),
//   '&:hover': {
//     backgroundColor: theme.palette.primary.light,
//     color: theme.palette.primary.main,
//   },
// }));

// const DietitianBio = styled(Typography)(({ theme }) => ({
//   fontSize: '1rem',
//   color: '#666',
//   marginTop: theme.spacing(2),
// }));

// const PersonalInfoContainer = styled(Box)(({ theme }) => ({
//   border: '1px solid #ddd',
//   borderRadius: 10,
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
// }));

// const DeititianDetailPage = () => {
//   const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
//   const totalCustomers = 10; // Total number of customers (You can change this value)
//   const maxCustomers = 25; // Maximum allowed customers

//   // Calculate the percentage of customers
//   const customerPercentage = (totalCustomers / maxCustomers) * 100;

//   const [isDialogOpen, setDialogOpen] = React.useState(false);

//   const handleDialogOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   return (
//     <ProfileContainer maxWidth="md">
//       <Grid container spacing={2}>
//         {/* Person Info Section */}
//         <Grid item xs={12} md={12}>
//           <PersonInfoContainer>
//             <DietitianAvatar src="/assets/images/avatars/avatar_1.jpg" alt="Person Image" />
//             <Box ml={isLargeScreen ? 4 : 0}>
//               <DietitianName variant="h6">John Doe</DietitianName>
//               <DietitianBio variant="body1">
//                 Dietitian | Fitness Enthusiast | Helping people achieve their health goals.
//               </DietitianBio>
//             </Box>
//             <EditButton variant="contained" color="primary" onClick={handleDialogOpen}>
//               Edit
//             </EditButton>
//           </PersonInfoContainer>
//         </Grid>

//         {/* Personal Information Section */}
//         <Grid item xs={12} md={12}>
//           <PersonalInfoContainer>
//             <Box display="flex" justifyContent={'space-between'}>
//               <Typography variant="h6">Personal Information</Typography>
//               <EditButton variant="outlined" color="primary">
//                 Edit
//               </EditButton>
//             </Box>

//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Name" secondary="Vishnu Sony" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Phone Number" secondary="[Phone Number here]" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Email" secondary="[Email here]" />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Qualification" secondary="[Qualification here]" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Study Details" secondary="[Study Details here]" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText
//                       primary={`Customer (${totalCustomers})`}
//                       secondary={
//                         <>
//                           <Box width="50%" mt={1} borderRadius={5} bgcolor="#ddd">
//                             <Box
//                               width={`${customerPercentage}%`}
//                               borderRadius={5}
//                               bgcolor="primary.main"
//                               color="primary.contrastText"
//                               textAlign="right"
//                               p={0.5}
//                             >
//                               {/* {totalCustomers}/{maxCustomers} */}
//                             </Box>
//                           </Box>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Height" secondary="[Height here]" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Weight" secondary="[Weight here]" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Experience" secondary="[Experience here]" />
//                   </ListItem>
//                 </List>
//               </Grid>
//             </Grid>
//           </PersonalInfoContainer>
//         </Grid>

//         {/* ID Card Information Section */}
//         <Grid item xs={12} md={12}>
//           <PersonalInfoContainer>
//             <Box display="flex" justifyContent={'space-between'}>
//               <Typography variant="h6">ID Card Information</Typography>
//               <EditButton variant="outlined" color="primary">
//                 Edit
//               </EditButton>
//             </Box>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="ID Card Type" secondary="Pan Card" />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="ID Card Number" secondary="ABCD1234XYZ" />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem button onClick={handleDialogOpen}>
//                     <ListItemText primary="Document Picture" secondary="Click to view" />
//                   </ListItem>
//                 </List>
//               </Grid>
//               {/* You can add more Grid items for more sections here */}
//             </Grid>
//           </PersonalInfoContainer>
//         </Grid>

//         {/* Guardian and Emergency Contact Section */}
//         <Grid item xs={12} md={12}>
//           <PersonalInfoContainer>
//             <Box display="flex" justifyContent={'space-between'}>
//               <Typography variant="h6">Guardian and Emergency Contact</Typography>
//               <EditButton variant="outlined" color="primary">
//                 Edit
//               </EditButton>
//             </Box>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6} md={6}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Emergency Contact Name" secondary="Jane Doe" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Local Guardian Name" secondary="John Smith" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Relationship with Emergency Contact" secondary="Sibling" />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} sm={6} md={6}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Emergency Contact Phone Number" secondary="+9876543210" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Local Guardian Phone Number" secondary="+1234567890" />
//                   </ListItem>
//                 </List>
//               </Grid>
//             </Grid>
//           </PersonalInfoContainer>
//         </Grid>

//         <Grid item xs={12} md={12}>
//           <PersonalInfoContainer>
//             <Box display="flex" justifyContent={'space-between'}>
//               <Typography variant="h6">Additional Information</Typography>
//               <EditButton variant="outlined" color="primary">
//                 Edit
//               </EditButton>
//             </Box>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText primary="Specializations/Expertise" secondary="Diet Planning, Weight Management" />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText
//                       primary="Certifications and Licenses"
//                       secondary="Certified Dietitian (CD), Licensed Nutritionist"
//                     />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText
//                       primary="Awards and Achievements"
//                       secondary="Best Dietitian Award 2021, Nutrition Excellence Award"
//                     />
//                   </ListItem>
//                   <ListItem>
//                     <ListItemText primary="Languages Spoken" secondary="English, Spanish" />
//                   </ListItem>
//                 </List>
//               </Grid>
//               <Grid item xs={12} sm={4} md={4}>
//                 <List dense>
//                   <ListItem>
//                     <ListItemText
//                       primary="Professional Memberships"
//                       secondary="American Dietetic Association (ADA), International Society of Sports Nutrition (ISSN)"
//                     />
//                   </ListItem>
//                   {/* Add more ListItem components for more fields */}
//                 </List>
//               </Grid>
//             </Grid>
//           </PersonalInfoContainer>
//         </Grid>
//       </Grid>

//       {/* Dialog for Document Picture */}
//       <Dialog open={isDialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Document Picture</DialogTitle>
//         <DialogContent>
//           {/* Replace 'document_picture.jpg' with the actual URL of the document picture */}
//           <img
//             src="https://cdn.pixabay.com/photo/2022/11/09/00/44/aadhaar-card-7579588_960_720.png"
//             alt="Document"
//             style={{ maxWidth: '100%', maxHeight: 400 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </ProfileContainer>
//   );
// };

// export default DeititianDetailPage;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/system';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  TextField,
} from '@mui/material';
import { Email, Person, Cake, School, Height, FitnessCenter, Save, LocationOn } from '@mui/icons-material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import NumbersIcon from '@mui/icons-material/Numbers';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';

const DetailsPageContainer = styled(Container)({
  //   paddingTop: '2rem',
});

const DetailsCard = styled(Card)({
  display: 'flex',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const DetailsCardContent = styled(CardContent)({
  flex: '1 1 auto',
});

const DetailsCardMedia = styled(CardMedia)({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '15px',
});

const DetailsSection = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const IconWrapper = styled(motion.span)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),
}));

const EditButtonWrapper = styled('div')({
  borderRadius: '50%',
  backgroundColor: '#1e90ff',
  width: 40,
  height: 40,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#0066cc',
  },
});

const DietitianDetailsPage = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedDietitian, setEditedDietitian] = React.useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDietitian({ ...dietitian });
  };

  const handleFieldChange = (field, value) => {
    setEditedDietitian((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    // Handle save logic here, e.g., make API request to update the data
    console.log('Edited dietitian:', editedDietitian);
    setIsEditing(false);
  };

  const dietitian = {
    photo: '/assets/images/avatars/avatar_1.jpg',
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 30,
    experience: '5 years',
    studyDetails: 'XYZ University',
    qualification: 'Registered Dietitian',
    height: '170 cm',
    weight: '65 kg',
    id_type: 'Aadhar',
    id_number: '7654 2334 2344',
    postWorkDetail: 'Post-workout meal planning and nutrition counseling',
    permanentAddress: {
      city: 'New York',
      state: 'New York',
      pincode: '12345',
      area: 'Manhattan',
      landmark: 'Central Park',
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
    },
    workAddress: {
      city: 'New York',
      state: 'New York',
      pincode: '67890',
      area: 'Downtown',
      landmark: 'Times Square',
      addressLine1: '456 Work Street',
      addressLine2: 'Office 10A',
    },
    localGuardianAddress: {
      city: 'New York',
      state: 'New York',
      pincode: '67890',
      area: 'Downtown',
      landmark: 'Times Square',
      addressLine1: '456 Work Street',
      addressLine2: 'Office 10A',
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Helmet>
        <title>{dietitian.name} | Dietitian Details</title>
      </Helmet>

      <DetailsPageContainer>
        <DetailsCard>
          <DetailsCardContent>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" alignItems={'center'}>
                <div>{!isEditing && <DetailsCardMedia image={dietitian.photo} title={dietitian.name} />}</div>
                <Box ml={3} flexDirection={'column'}>
                  <Typography variant="h6">
                    {isEditing ? (
                      <TextField
                        label="Name"
                        value={editedDietitian.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                      />
                    ) : (
                      dietitian.name
                    )}
                  </Typography>
                  <Typography mt={1} variant="body1" gutterBottom>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        label="post workout"
                        value={editedDietitian.postWorkDetail}
                        onChange={(e) => handleFieldChange('postWorkDetail', e.target.value)}
                      />
                    ) : (
                      dietitian.postWorkDetail
                    )}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                {!isEditing ? (
                  <Tooltip title="Edit">
                    <EditButtonWrapper>
                      <IconButton aria-label="Edit" onClick={handleEditClick}>
                        <EditIcon style={{ color: 'white' }} />
                      </IconButton>
                    </EditButtonWrapper>
                  </Tooltip>
                ) : (
                  <Tooltip title="Save">
                    <EditButtonWrapper>
                      <IconButton aria-label="Save" onClick={handleSaveClick}>
                        <Save style={{ color: 'white' }} />
                      </IconButton>
                    </EditButtonWrapper>
                  </Tooltip>
                )}
              </Stack>
            </div>
            <Divider sx={{ my: 2 }} />

            <DetailsSection container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <Email />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="Email"
                          value={editedDietitian.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                        />
                      ) : (
                        dietitian.email
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <Cake />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="Age"
                          value={editedDietitian.age}
                          onChange={(e) => handleFieldChange('age', e.target.value)}
                        />
                      ) : (
                        `Age: ${dietitian.age}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <School />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="Study Details"
                          value={editedDietitian.studyDetails}
                          onChange={(e) => handleFieldChange('studyDetails', e.target.value)}
                        />
                      ) : (
                        `Study Details: ${dietitian.studyDetails}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <Height />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="Height"
                          value={editedDietitian.height}
                          onChange={(e) => handleFieldChange('height', e.target.value)}
                        />
                      ) : (
                        `Height: ${dietitian.height}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <FitnessCenter />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="Weight"
                          value={editedDietitian.weight}
                          onChange={(e) => handleFieldChange('weight', e.target.value)}
                        />
                      ) : (
                        `Weight: ${dietitian.weight}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <School />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="Qualification"
                          value={editedDietitian.qualification}
                          onChange={(e) => handleFieldChange('qualification', e.target.value)}
                        />
                      ) : (
                        `Qualification: ${dietitian.qualification}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <DocumentScannerIcon />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="ID Type"
                          value={editedDietitian.id_type}
                          onChange={(e) => handleFieldChange('id_type', e.target.value)}
                        />
                      ) : (
                        `ID Type: ${dietitian.id_type}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <NumbersIcon />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {isEditing ? (
                        <TextField
                          label="ID Card Number"
                          value={editedDietitian.id_number}
                          onChange={(e) => handleFieldChange('id_number', e.target.value)}
                        />
                      ) : (
                        `ID Card Number: ${dietitian.id_number}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </DetailsSection>

            {/* <DetailsSection>
              <SectionTitle variant="subtitle1" gutterBottom>
                Post Work Detail
              </SectionTitle>
             
            </DetailsSection> */}

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={2} justifyContent={'space-between'}>
              {[
                {
                  sectionTitle: 'Permanent Address',
                  addressType: 'permanentAddress',
                  address: dietitian.permanentAddress,
                },
                {
                  sectionTitle: 'Work Address',
                  addressType: 'workAddress',
                  address: dietitian.workAddress,
                },
                {
                  sectionTitle: 'Local Guardian Address',
                  addressType: 'localGuardianAddress',
                  address: dietitian.localGuardianAddress,
                },
              ].map((section) => (
                <DetailsSection key={section.sectionTitle}>
                  <SectionTitle variant="subtitle1" gutterBottom>
                    {section.sectionTitle}
                  </SectionTitle>
                  <Grid container spacing={1} alignItems="flex-start">
                    <Grid item>
                      <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                        <LocationOn />
                      </IconWrapper>
                    </Grid>
                    <Grid item justifyContent={'space-between'}>
                      {isEditing ? (
                        <>
                          {Object.entries(section.address).map(([fieldKey, fieldValue]) => (
                            <Box key={fieldKey} marginBottom={1}>
                              <TextField
                                label={fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}
                                value={fieldValue}
                                onChange={(e) =>
                                  handleFieldChange(section.addressType, {
                                    ...section.address,
                                    [fieldKey]: e.target.value,
                                  })
                                }
                              />
                            </Box>
                          ))}
                        </>
                      ) : (
                        <>
                          {Object.values(section.address).map((fieldValue, index) => (
                            <Typography key={index} variant="body1" gutterBottom>
                              {fieldValue}
                            </Typography>
                          ))}
                        </>
                      )}
                    </Grid>
                  </Grid>
                </DetailsSection>
              ))}
            </Stack>
          </DetailsCardContent>
        </DetailsCard>
      </DetailsPageContainer>
    </>
  );
};

export default DietitianDetailsPage;
