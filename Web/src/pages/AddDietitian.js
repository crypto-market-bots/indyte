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
import { useDispatch, useSelector } from 'react-redux';
import { addDietitian } from 'src/utils/apiCalls';

const DetailsPageContainer = styled(Container)({
  // paddingTop: '2rem',
});

const DetailsCard = styled(Card)({
  display: 'flex',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const DetailsCardContent = styled(CardContent)({
  flex: '1 1 auto',
});

const DetailsCardMedia = styled(CardMedia)({
  width: '300px',
  height: '300px',
  objectFit: 'cover',
});

const UploadImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

const ImagePreview = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  objectFit: 'cover',
  margin: '1rem 0',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const ImageUploadButton = styled('label')(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  fontSize: '1rem',
  fontWeight: 'bold',
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

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

const AddDietitian = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedDietitian, setEditedDietitian] = React.useState({
    photo: '',
    name: '',
    email: '',
    age: '',
    experience: '',
    studyDetails: '',
    qualification: '',
    height: '',
    weight: '',
    id_type: '',
    id_number: '',
    postWorkDetail: '',
    permanentAddress: {
      city: '',
      state: '',
      pincode: '',
      area: '',
      landmark: '',
      addressLine1: '',
      addressLine2: '',
    },
    workAddress: {
      city: '',
      state: '',
      pincode: '',
      area: '',
      landmark: '',
      addressLine1: '',
      addressLine2: '',
    },
    localGuardianAddress: {
      city: '',
      state: '',
      pincode: '',
      area: '',
      landmark: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const [idImage, setIdImage] = React.useState('');

  // Function to handle the ID image upload
  const handleIDImageUpload = (event) => {
    const file = event.target.files[0];
    // You can handle the uploaded file here, e.g., save it to state or send it to the server.
    setIdImage(file); // Store the uploaded ID image file in the state
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDietitian({ ...editedDietitian });
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // You can handle the uploaded file here, e.g., save it to state or send it to the server.
    setEditedDietitian((prevState) => ({
      ...prevState,
      photo: file, // Store the uploaded image file in the state
    }));
  };

  const iconVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleAddDietitian = () => {
    dispatch(addDietitian());
  };

  return (
    <>
      <Helmet>
        <title>Add Dietitian | Dietitian Details</title>
      </Helmet>

      <DetailsPageContainer>
        <DetailsCard>
          <DetailsCardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                Add Dietitian
              </Typography>

              <Tooltip title="Save">
                <EditButtonWrapper>
                  <IconButton aria-label="Save" onClick={handleSaveClick}>
                    <Save onClick={handleAddDietitian} style={{ color: 'white' }} />
                  </IconButton>
                </EditButtonWrapper>
              </Tooltip>
            </Stack>
            <Stack flexDirection={'row'} display="flex" justifyContent="space-evenly">
              <UploadImageBox>
                <Typography variant="h6">Profile Image:</Typography>
                <ImagePreview
                  src={
                    editedDietitian.photo
                      ? URL.createObjectURL(editedDietitian.photo)
                      : 'https://img.freepik.com/free-icon/user_318-159711.jpg'
                  }
                  alt="Profile"
                  width={100}
                  height={100}
                />
                <ImageUploadButton>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  Upload Image
                </ImageUploadButton>
              </UploadImageBox>

              <UploadImageBox>
                <Typography variant="h6" mb={2}>
                  ID Image:
                </Typography>
                {idImage ? (
                  <img src={URL.createObjectURL(idImage)} alt="ID" width={150} height={150} />
                ) : (
                  <img src="https://via.placeholder.com/150" alt="ID Placeholder" width={150} height={150} />
                )}
                <ImageUploadButton style={{ marginTop: '10px' }}>
                  <input type="file" accept="image/*" onChange={handleIDImageUpload} style={{ display: 'none' }} />
                  Upload Document
                </ImageUploadButton>
              </UploadImageBox>
            </Stack>

            <DetailsSection container spacing={2} mt={1} textAlign={'center'}>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <Email />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      <TextField
                        label="Name"
                        value={editedDietitian.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <Email />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      <TextField
                        label="Email"
                        value={editedDietitian.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                      />
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
                      <TextField
                        label="Age"
                        value={editedDietitian.age}
                        onChange={(e) => handleFieldChange('age', e.target.value)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <Height />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      <TextField
                        label="Height"
                        value={editedDietitian.height}
                        onChange={(e) => handleFieldChange('height', e.target.value)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <FitnessCenter />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      <TextField
                        label="Weight"
                        value={editedDietitian.weight}
                        onChange={(e) => handleFieldChange('weight', e.target.value)}
                      />
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
                      <TextField
                        label="ID Type"
                        value={editedDietitian.id_type}
                        onChange={(e) => handleFieldChange('id_type', e.target.value)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <NumbersIcon />
                    </IconWrapper>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      <TextField
                        label="ID Card Number"
                        value={editedDietitian.id_number}
                        onChange={(e) => handleFieldChange('id_number', e.target.value)}
                      />
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
                      <TextField
                        label="Study Details"
                        value={editedDietitian.studyDetails}
                        onChange={(e) => handleFieldChange('studyDetails', e.target.value)}
                      />
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
                      <TextField
                        label="Qualification"
                        value={editedDietitian.qualification}
                        onChange={(e) => handleFieldChange('qualification', e.target.value)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </DetailsSection>

            <Divider sx={{ my: 2 }} />

            <DetailsSection>
              <SectionTitle variant="subtitle1" gutterBottom>
                Post Work Detail
              </SectionTitle>
              <Typography variant="body1" gutterBottom>
                <TextField
                  fullWidth
                  value={editedDietitian.postWorkDetail}
                  onChange={(e) => handleFieldChange('postWorkDetail', e.target.value)}
                />
              </Typography>
            </DetailsSection>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={2} justifyContent={'space-around'}>
              {[
                {
                  sectionTitle: 'Permanent Address',
                  addressType: 'permanentAddress',
                  address: editedDietitian.permanentAddress,
                },
                {
                  sectionTitle: 'Work Address',
                  addressType: 'workAddress',
                  address: editedDietitian.workAddress,
                },
                {
                  sectionTitle: 'Local Guardian Address',
                  addressType: 'localGuardianAddress',
                  address: editedDietitian.localGuardianAddress,
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
                    <Grid item>
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

export default AddDietitian;
