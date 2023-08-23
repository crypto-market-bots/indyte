import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Button, Stack, Container, Typography, Grid, IconButton } from '@mui/material';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import Iconify from '../components/iconify';
import { UserListToolbar } from '../sections/@dashboard/user';
// import USERLIST from '../_mock/user';
import Label from '../components/label';
import { fetchDietitian } from 'src/utils/apiCalls';
import { useSelector, useDispatch } from 'react-redux';

export default function DietitianPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Dietitians = useSelector((state) => state.slice.data.dietitians);
  console.log('dietitians are ', Dietitians);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = Dietitians.filter(
    (user) => user.first_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  );

  const handleNavigate = () => {
    navigate('/dashboard/user/dietitian/dfkjd');
  };

  useEffect(() => {
    dispatch(fetchDietitian());
  }, []);

  return (
    <>
      <Helmet>
        <title>User | Minimal UI</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Dietitian
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard/user/dietitian/add')}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Dietitian
          </Button>
        </Stack>
        <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Grid container spacing={2}>
          {filteredUsers?.map((user) => {
            const { _id, first_name, last_name, status, photo } = user;
            const isSelected = selected.includes(first_name);

            return (
              <Grid item key={_id} xs={12} sm={6} md={4} lg={3}>
                <Card onClick={handleNavigate} sx={{ cursor: 'pointer' }}>
                  <CardMedia component="img" image={photo} alt={first_name} />

                  <CardContent>
                    <Typography variant="subtitle2" noWrap>
                      {first_name} {last_name}
                    </Typography>

                    {/* <Typography variant="body2" color="textSecondary" mt={0.5} noWrap>
                      <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                    </Typography> */}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
