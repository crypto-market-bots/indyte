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
  FormControl,
  InputLabel,
} from '@mui/material';

import { Link } from 'react-router-dom';
// components
import { AutoComplete, Col, DatePicker, Input, Row, Segmented, Select } from 'antd';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { CloseSquareFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer, fetchCustomerDetails } from 'src/utils/apiCalls';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Diet', alignRight: false },
  { id: 'company', label: 'Quantity', alignRight: false },
  { id: 'phoneNumber', label: 'Meal Type', alignRight: false },
  { id: 'isVerified', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(array, (_user) => {
      const nameMatch = _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      const dietitianMatch = _user.company.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      return nameMatch || dietitianMatch;
    });
  }

  return stabilizedThis.map((el) => el[0]);
}

// const options = [{ value: 'Vishnu' }, { value: 'Lakshay' }, { value: 'Mohit' }, { value: 'Deepak' }];

const DIETICIANS = [
  'Dietician 1',
  'Dietician 2',
  'Dietician 3',
  // Add more Dietician options as needed
];
const GOALS = ['Weight Loss', 'Weight Gain'];

export default function HistoryPage() {
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

  const [selectedType, setSelectedType] = useState('Meal');

  const customers = useSelector((state) => state.slice.data.customers);

  const dispatch = useDispatch();

  const options = customers.map((customer, index) => {
    return {
      value: `${customer.first_name} ${customer.last_name}`,
      image: customer.image,
      customerId: customer._id,
    };
  });

  useEffect(() => {
    dispatch(fetchCustomer());
  }, []);

  const handleSegmentedChange = (selectedOption) => {
    setSelectedType(selectedOption);
    console.log('type ', selectedOption);
  };

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
      const newSelecteds = USERLIST.map((n) => n.name);
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

  const [selectedValues, setSelectedValues] = useState({
    user: null,
    date: null,
  });

  const handleSelect = async (value, option) => {
    if (option && option.customerId) {
      setSelectedValues({ ...selectedValues, user: option.customerId });
      await dispatch(fetchCustomerDetails(option.customerId));
      // dispatch(fetchUserMealRecommendation(option.customerId));
      // dispatch(fetchUserWorkoutRecommendation({ user_id: option.customerId, type: 'all', date: date.workout }));
    }
  };

  const handleSelectChange = (key, value) => {
    setSelectedValues({
      ...selectedValues,
      [key]: value,
    });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> History | Minimal UI </title>
      </Helmet>

      <Container>
        <Segmented size="large" block options={['Meal', 'Workout']} onChange={handleSegmentedChange} />
        <Row style={{ margin: '10px 0px', gap: '10px', display: 'flex' }}>
          <Col span={6}>
            <AutoComplete
              // popupClassName="certain-category-search-dropdown"
              style={{ width: '100%' }}
              options={options?.map((option, index) => ({
                value: option.value,
                label: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={option.image} style={{ marginRight: '10px' }} /> {option.value}
                  </div>
                ),
                customerId: option.customerId,
              }))}
              filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              onSelect={handleSelect}
              allowClear={{ clearIcon: <CloseSquareFilled /> }}
            >
              <Input size="medium" placeholder="Search here" />
            </AutoComplete>
          </Col>
          <Col>
            <Select placeholder="Meal" size="middle" style={{ width: 150 }}>
              <Select.Option value="Meal">Meal</Select.Option>
              <Select.Option value="Workout">Workout</Select.Option>
              <Select.Option value="Sleep">Sleep</Select.Option>
              <Select.Option value="Water">Water</Select.Option>
              <Select.Option value="Step">Step</Select.Option>
            </Select>
          </Col>
          <Col>
            <DatePicker onChange={(date) => handleSelectChange('date', date)} value={selectedValues.date} />
          </Col>
        </Row>

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
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified, phoneNumber, goal } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography
                              variant="subtitle2"
                              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                              noWrap
                              component={Link}
                              to={`/dashboard/user/customer/id`}
                            >
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{phoneNumber}</TableCell>

                        <TableCell align="left">{goal}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
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
            count={USERLIST.length}
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
