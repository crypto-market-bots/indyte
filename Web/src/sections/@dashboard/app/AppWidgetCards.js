// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
//   marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetCards.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetCards({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 2,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    >
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <StyledIcon
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                theme.palette[color].dark,
                0.24
              )} 100%)`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </StyledIcon>
      </Box>
      <Box >
        <Typography variant="h5">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
