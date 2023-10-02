// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Card, Divider as MuiDivider, CardHeader, Button as MuiButton } from '@mui/material';
import { Button, DatePicker, Divider, Empty, Image, Tag, Typography } from 'antd';

// components
import Iconify from '../iconify/Iconify';
import Scrollbar from '../scrollbar/Scrollbar';

// ----------------------------------------------------------------------

HealthSnapshot.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function HealthSnapshot({ title, date, filterResult, subheader, list, isEmpty, ...other }) {
  return (
    <Card {...other}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mr={3}>
        <CardHeader title={title} subheader={subheader} />
        <DatePicker
          size={8}
          // value={date ? new Date(date) : null}
          onChange={(selectedDate) => {
            console.log('selected date', selectedDate);
            if (selectedDate) {
              selectedDate = new Date(selectedDate);
              const year = selectedDate.getFullYear();
              const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
              const day = String(selectedDate.getDate()).padStart(2, '0');
              let formattedDate = `${year}-${month}-${day}`;
              filterResult(selectedDate, formattedDate);
            } else {
              filterResult(null);
            }
          }}
        />
      </Stack>
      {isEmpty ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <Scrollbar style={{ height: '50vh', minHeight: '400px' }}>
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
              {list?.map((news) => (
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
  const { image, title, foodName, isConsumedmeal, mealType, quantity, mealCompletionImage, isSkipMeal } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image alt={title} src={image} style={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
      {/* <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} /> */}

      <Box sx={{ minWidth: 240, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Typography.Text>{foodName}</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text>{mealType}</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text>{quantity}</Typography.Text>
        <Divider type="vertical" />
        {!isSkipMeal && !isConsumedmeal ? (
          <Tag color="yellow">{'pending'}</Tag>
        ) : isSkipMeal ? (
          <Tag color="red">{'skipped'}</Tag>
        ) : isConsumedmeal && !mealCompletionImage ? (
          <Tag color="green">{'consumed'}</Tag>
        ) : (
          <Image alt={'consumed'} src={image} style={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
        )}
      </Box>
      <Button style={{ marginRight: '10px' }}>Edit</Button>
    </Stack>
  );
}
