import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Card, CardContent, CardMedia,Button, Stack,Container, Typography, Grid, IconButton } from '@mui/material';
import { sentenceCase } from 'change-case';
import Iconify from '../components/iconify';
import { UserListToolbar } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import Label from '../components/label';

export default function DietitianPage() {
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = USERLIST.filter(
    (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  );

  return (
    <>
      <Helmet>
        <title>User | Minimal UI</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h4" gutterBottom>
                Dietian
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Dietitian
            </Button>
        </Stack>
        <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Grid container spacing={2}>
          {filteredUsers.map((user) => {
            const { id, name, status, avatarUrl } = user;
            const isSelected = selected.includes(name);

            return (
              <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardMedia component="img" image={avatarUrl} alt={name} />

                  <CardContent>
                    <Typography variant="subtitle2" noWrap>
                      {name}
                    </Typography>
                    

                    <Typography variant="body2" color="textSecondary" mt={0.5} noWrap>
                    <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                    </Typography>
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
