import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Box, Typography, List, ListItem, ListItemText, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: 10,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const AwesomeButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.8rem',
  borderRadius: 30,
  padding: '8px 24px',
  borderColor: theme.palette.primary.main,
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)', 
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  '&:not(:last-child)': {
    marginRight: theme.spacing(2),
  },
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: theme.spacing(1),
}));

const createListItems = (data) => {
  return data.map((item) => (
    <ListItem key={item.label}>
      <ListItemText primary={item.label} secondary={item.value} />
    </ListItem>
  ));
};

const AddDetailDialog = ({ open, onClose, onAddDetail }) => {
  const [newDetail, setNewDetail] = useState({ label: '', value: '' });

  const handleLabelChange = (event) => {
    setNewDetail({ ...newDetail, label: event.target.value });
  };

  const handleValueChange = (event) => {
    setNewDetail({ ...newDetail, value: event.target.value });
  };

  const handleAddDetail = () => {
    onAddDetail(newDetail);
    setNewDetail({ label: '', value: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Detail</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Label"
          value={newDetail.label}
          onChange={handleLabelChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Value"
          value={newDetail.value}
          onChange={handleValueChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddDetail} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CustomerDetailPage = () => {
  // Sample data for Personal Information and Additional Information sections
  const personalInfoData = [
    { label: "Name", value: "John Doe" },
    { label: "Height", value: "180 cm" },
    { label: "Weight", value: "75 kg" },
    { label: "Waist", value: "90 cm" },
    { label: "Age", value: "30 years" },
    { label: "E-mail id", value: "john.doe@example.com" },
    { label: "Dietary habits", value: "Vegetarian" },
    { label: "Likes", value: "Healthy Foods, Fruits" },
    { label: "Dislikes", value: "Junk Foods, Soft Drinks" },
    { label: "Any food allergy", value: "None" },
    { label: "Lifestyle", value: "Moderate" },
    { label: "Physical activity", value: "Regular exercise, Jogging" },
    { label: "Location", value: "New York, USA" },
  ];

  const additionalInfoData = [
    { label: "Any Medical history", value: "None" },
    { label: "Do you take any supplements or herbs or medicines", value: "None" },
    { label: "Do you skip your meal?", value: "Occasionally" },
    { label: "Fast food or any other outer foods frequency", value: "Once a week" },
    { label: "Office timing", value: "9:00 AM - 5:00 PM" },
    { label: "Occupation", value: "Software Engineer" },
  ];


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(additionalInfoData);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddDetail = (newDetail) => {
    setAdditionalInfo([...additionalInfo, newDetail]);
    setIsDialogOpen(false);
  };

  const groupAdditionalInfo = () => {
    const columns = [[], [], []];
    additionalInfo.forEach((item, index) => {
      columns[index % 3].push(item);
    });
    return columns;
  };
  

  return (
    <ProfileContainer maxWidth="md">
      <Grid container spacing={2}>
        {/* Person Info Section */}
        <Grid item xs={12} md={12}>
          <Box>
            <AvatarContainer>
              <CustomAvatar src="/assets/images/avatars/avatar_1.jpg" alt="Person Image" />
              <Title variant="h6">John Doe</Title>
              <ButtonContainer>
                <AwesomeButton variant="contained" color="primary">Progress Tracker</AwesomeButton>
                <AwesomeButton variant="contained" color="primary">Meal</AwesomeButton>
                <AwesomeButton variant="contained" color="primary">Workout</AwesomeButton>
              </ButtonContainer>
            </AvatarContainer>
          </Box>
        </Grid>

        {/* Personal Information Section */}
        <Grid item xs={12} md={12}>
          <SectionContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Title variant="h6">Personal Information</Title>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>{createListItems(personalInfoData.slice(0, 5))}</List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>{createListItems(personalInfoData.slice(5, 10))}</List>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <List dense>{createListItems(personalInfoData.slice(10))}</List>
              </Grid>
            </Grid>
          </SectionContainer>
        </Grid>

         {/* Additional Information Section */}
         <Grid item xs={12} md={12}>
          <SectionContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Title variant="h6">Additional Information</Title>
              <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Add
              </Button>
            </Box>

            <Grid container spacing={2}>
              {groupAdditionalInfo().map((column, columnIndex) => (
                <Grid item xs={12} sm={4} md={4} key={columnIndex}>
                  <List dense >
                    {column.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item.label} secondary={item.value} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
          </SectionContainer>
        </Grid>
      </Grid>


      {/* Add Detail Dialog */}
      <AddDetailDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onAddDetail={handleAddDetail}
      />
    </ProfileContainer>
  );
};

export default CustomerDetailPage;

