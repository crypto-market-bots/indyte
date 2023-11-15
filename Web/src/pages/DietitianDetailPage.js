import React, { useEffect, useState } from 'react';
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
import { Email, Cake, School, Height, FitnessCenter, Save, LocationOn } from '@mui/icons-material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import NumbersIcon from '@mui/icons-material/Numbers';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword, fetchDietitianDetails } from 'src/utils/apiCalls';
import { Button, Image, Input, Modal } from 'antd';

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
  const dispatch = useDispatch();
  const params = useParams();
  const dietitian_id = params?.id;
  const dietitian = useSelector((state) => state.slice.data.dietitiansDetails);
  console.log(dietitian);
  useEffect(() => {
    dispatch(fetchDietitianDetails(dietitian_id));
  }, []);

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

  const iconVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const calculateAge = (dateString) => {
    const birthdate = new Date(dateString);
    const now = new Date();

    let age = now.getFullYear() - birthdate.getFullYear();

    // Check if birthday has occurred this year
    if (
      now.getMonth() < birthdate.getMonth() ||
      (now.getMonth() === birthdate.getMonth() && now.getDate() < birthdate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log('hii');
    const payload = {
      password,
      confirm_password: cPassword,
      dietitianId: dietitian_id,
    };
    dispatch(ResetPassword(payload));
  };
  const handleCancel = () => {
    setPassword('');
    setCPassword('');
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{`${dietitian?.first_name} ${dietitian?.last_name} | Dietitian Details`}</title>
      </Helmet>

      <DetailsPageContainer>
        <DetailsCard>
          <DetailsCardContent>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" alignItems={'center'}>
                <div>
                  {!isEditing && (
                    <DetailsCardMedia
                      image={dietitian?.profile_photo || '/blank-profile.jpg'}
                      title={`${dietitian?.first_name} ${dietitian?.last_name}`}
                    />
                  )}
                </div>
                <Box ml={3} flexDirection={'column'} display={'flex'} justifyContent={'center'}>
                  <Typography variant="h6">
                    {isEditing ? (
                      <TextField
                        label="Name"
                        // value={editedDietitian.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                      />
                    ) : (
                      <div style={{ display: 'grid', justifyItems: 'start' }}>
                        {`${dietitian?.first_name} ${dietitian?.last_name}`}
                        <Button type="link" onClick={showModal} style={{ padding: 0 }}>
                          Reset Password
                        </Button>
                      </div>
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
                          value={editedDietitian?.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                        />
                      ) : (
                        dietitian?.email
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
                          // value={editedDietitian.age}
                          onChange={(e) => handleFieldChange('age', e.target.value)}
                        />
                      ) : (
                        `Age: ${calculateAge(dietitian?.dob)}`
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
                          value={editedDietitian?.study_details}
                          onChange={(e) => handleFieldChange('studyDetails', e.target.value)}
                        />
                      ) : (
                        `Study Details: ${dietitian?.study_details}`
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
                          value={editedDietitian?.height}
                          onChange={(e) => handleFieldChange('height', e.target.value)}
                        />
                      ) : (
                        `Height: ${dietitian?.height}`
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
                          label="Family Contac"
                          value={editedDietitian?.family_contact_number}
                          onChange={(e) => handleFieldChange('family_contact_number', e.target.value)}
                        />
                      ) : (
                        `Family Contact No: ${dietitian?.family_contact_number}`
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
                          label="Gender"
                          value={editedDietitian?.gender}
                          onChange={(e) => handleFieldChange('gender', e.target.value)}
                        />
                      ) : (
                        `Gender: ${dietitian?.gender}`
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
                          value={editedDietitian?.weight}
                          onChange={(e) => handleFieldChange('weight', e.target.value)}
                        />
                      ) : (
                        `Weight: ${dietitian?.weight}`
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
                          value={editedDietitian?.qualification}
                          onChange={(e) => handleFieldChange('qualification', e.target.value)}
                        />
                      ) : (
                        `Qualification: ${dietitian?.qualification}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                {/* <Grid container spacing={1} alignItems="center" justifyContent={'center'}> */}

                {/* </Grid> */}

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
                          value={editedDietitian?.id_card_number}
                          onChange={(e) => handleFieldChange('id_number', e.target.value)}
                        />
                      ) : (
                        `ID Card Number: ${dietitian?.id_card_number}`
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
                          label="Experience"
                          value={editedDietitian?.experience}
                          onChange={(e) => handleFieldChange('id_number', e.target.value)}
                        />
                      ) : (
                        `Experience: ${dietitian?.experience}`
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
                          label="Phone"
                          value={editedDietitian?.experience}
                          onChange={(e) => handleFieldChange('id_number', e.target.value)}
                        />
                      ) : (
                        `Phone: ${dietitian?.phone}`
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Stack direction={'row'} display={'flex'} alignItems={'center'} gap={2}>
                  <Grid item>
                    <IconWrapper variants={iconVariants} initial="hidden" animate="visible">
                      <DocumentScannerIcon />
                    </IconWrapper>
                  </Grid>
                  <Typography variant="body1" gutterBottom>
                    {isEditing ? (
                      <TextField
                        label="ID Type"
                        value={editedDietitian?.id_card_type}
                        onChange={(e) => handleFieldChange('id_type', e.target.value)}
                      />
                    ) : (
                      `ID Type: ${dietitian?.id_card_type}`
                    )}
                  </Typography>
                  <Image src={dietitian?.id_card_photo} style={{ aspectRatio: 1 / 1, width: '50px', height: '50px' }} />
                </Stack>
              </Grid>
            </DetailsSection>

            <DetailsSection>
              <SectionTitle variant="subtitle1" gutterBottom>
                Post Work Detail
              </SectionTitle>
              <Typography mt={1} variant="body1" gutterBottom>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="post workout"
                    value={editedDietitian?.past_work_details}
                    onChange={(e) => handleFieldChange('postWorkDetail', e.target.value)}
                  />
                ) : (
                  dietitian?.past_work_details
                )}
              </Typography>
            </DetailsSection>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={2} justifyContent={'space-between'}>
              {[
                {
                  sectionTitle: 'Permanent Address',
                  addressType: 'permanentAddress',
                  address: dietitian?.permanent_address,
                },
                {
                  sectionTitle: 'Work Address',
                  addressType: 'workAddress',
                  address: dietitian?.local_address,
                },
                {
                  sectionTitle: 'Local Guardian Address',
                  addressType: 'localGuardianAddress',
                  address: dietitian?.local_guardian_address,
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
                      {isEditing &&
                        section?.address &&
                        typeof section.address === 'object' &&
                        Object.entries(section?.address).map(([fieldKey, fieldValue]) => (
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
                      {!isEditing &&
                        section?.address &&
                        typeof section.address === 'object' &&
                        Object.values(section?.address).map((fieldValue, index) => (
                          <Typography key={index} variant="body1" gutterBottom>
                            {fieldValue}
                          </Typography>
                        ))}
                    </Grid>
                  </Grid>
                </DetailsSection>
              ))}
            </Stack>
          </DetailsCardContent>
        </DetailsCard>
        <Modal title="Reset Password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <b>New Password</b>
          <Input value={password} style={{ marginBottom: '10px' }} onChange={(e) => setPassword(e.target.value)} />
          <b>Confirm Password</b>
          <Input value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
        </Modal>
      </DetailsPageContainer>
    </>
  );
};

export default DietitianDetailsPage;
