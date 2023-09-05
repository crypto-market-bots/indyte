// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Card, Divider as MuiDivider, CardHeader, Button as MuiButton } from '@mui/material';
import { Button, Divider, Empty, Typography } from 'antd';

// components
import Iconify from '../iconify/Iconify';
import Scrollbar from '../scrollbar/Scrollbar';

// ----------------------------------------------------------------------

HealthSnapshot.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function HealthSnapshot({ title, subheader, list, isEmpty, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {isEmpty ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <Scrollbar style={{ height: '50vh', minHeight: '400px' }}>
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
              {list.map((news) => (
                <HealthCard key={news.id} news={news} />
              ))}
            </Stack>
          </Scrollbar>
        </>
      )}
      <MuiDivider />

      <Box sx={{ p: 1, textAlign: 'right' }}>
        <MuiButton size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </MuiButton>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

HealthCard.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function HealthCard({ news }) {
  const { image, title, foodName, mealType, quantity } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Typography.Text>{foodName}</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text>{mealType}</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text>{quantity}</Typography.Text>
      </Box>
      <Button style={{ marginRight: '10px' }}>Edit</Button>
    </Stack>
  );
}
