import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

import { Link } from 'react-router-dom';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { fetchCustomer, fetchDietitian, fetchUser } from 'src/utils/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'phone', label: 'Phone No.', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'goal', label: 'Goal', alignRight: false },
  { id: 'dob', label: 'Dob', alignRight: false },
  { id: 'height', label: 'Height', alignRight: false },
  { id: 'weight', label: 'Weight', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log('array', array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(array, (_user) => {
      console.log('user', _user);
      const firstNameMatch = _user.first_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      const lastNameMatch = _user.last_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      const goalMatch = _user.goal?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      const emailMatch = _user.email?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      // const dietitianMatch = _user.company.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      return firstNameMatch || lastNameMatch || goalMatch || emailMatch;
    });
  }

  return stabilizedThis.map((el) => el[0]);
}

const DIETICIANS = [
  'Dietician 1',
  'Dietician 2',
  'Dietician 3',
  // Add more Dietician options as needed
];
const GOALS = ['Weight Loss', 'Weight Gain'];

export default function UserPage() {
  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.slice.data.customers);

  const [selectedGoal, setSelectedGoal] = useState('');

  const [selectedDietician, setSelectedDietician] = useState('');

  const [open, setOpen] = useState(null);

  const [openFilter, setOpenFilter] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectDietician = (event) => {
    setSelectedDietician(event.target.value);
  };

  const handleSelectGoal = (event) => {
    setSelectedGoal(event.target.value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Customers.map((n) => n.first_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenFilter = (event) => {
    setOpenFilter(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setOpenFilter(null);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(Customers, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    dispatch(fetchCustomer());
  }, []);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            openMenu={handleOpenFilter}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Customers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      full_name,
                      dob,
                      email,
                      gender,
                      goal,
                      height,
                      height_unit,
                      current_weight,
                      weight_unit,
                      image,
                      phone,
                      weight,
                      _id,
                    } = row;
                    const selectedUser = selected.indexOf(email) !== -1;
                    console.log('row==>', row);

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={full_name} src={image} />
                            <Typography
                              variant="subtitle2"
                              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                              noWrap
                              component={Link}
                              to={`/dashboard/user/customer/${_id}`}
                            >
                              {full_name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{goal}</TableCell>
                        <TableCell align="left">{dob}</TableCell>
                        <TableCell align="left">{`${height} ${height_unit}`}</TableCell>
                        <TableCell align="left">{`${current_weight} ${weight_unit}`}</TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }} align="left">
                          {gender}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Customers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Popover
        open={Boolean(openFilter)}
        anchorEl={openFilter}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem value="" style={{ fontWeight: 'bold', color: '#333' }}>
          <em>All</em>
        </MenuItem>
        {GOALS.map((goal) => (
          <MenuItem key={goal} value={goal}>
            {goal}
          </MenuItem>
        ))}
      </Popover>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
