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
import {
    Email,
    Person,
    Cake,
    School,
    Height,
    FitnessCenter,
    Save,
    LocationOn,
} from '@mui/icons-material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import NumbersIcon from '@mui/icons-material/Numbers';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';

const DetailsPageContainer = styled(Container)({
    paddingTop: '2rem',
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
                    {!isEditing &&
                        <DetailsCardMedia image={dietitian.photo} title={dietitian.name} />}

                    <DetailsCardContent>
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
                        <Typography variant="h6" gutterBottom>
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



                        <Divider sx={{ my: 2 }} />

                        <DetailsSection>
                            <SectionTitle variant="subtitle1" gutterBottom>
                                Post Work Detail
                            </SectionTitle>
                            <Typography variant="body1" gutterBottom>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        value={editedDietitian.postWorkDetail}
                                        onChange={(e) => handleFieldChange('postWorkDetail', e.target.value)}
                                    />
                                ) : (
                                    dietitian.postWorkDetail
                                )}
                            </Typography>
                        </DetailsSection>

                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} justifyContent={"space-around"}>
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
                                        <Grid item>
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
