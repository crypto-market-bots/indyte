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
import {
  AutoComplete,
  Col,
  DatePicker,
  Drawer,
  Empty,
  Image,
  Input,
  Rate,
  Row,
  Segmented,
  Select,
  Spin,
  Tag,
} from 'antd';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { CloseSquareFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer, fetchCustomerDetails, fetchHistory } from 'src/utils/apiCalls';
import TextArea from 'antd/es/input/TextArea';
// ----------------------------------------------------------------------

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

const GOALS = ['Weight Loss', 'Weight Gain'];

export default function HistoryPage() {
  const [open, setOpen] = useState(null);

  const [openFilter, setOpenFilter] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const history = useSelector((state) => state.slice.data.history?.data);

  const [filteredHistory, setFilteredHistory] = useState(history);
  console.log('top filter is ', filteredHistory);

  const [perPage, setPerPage] = useState(5);

  const customers = useSelector((state) => state.slice.data.customers);

  const isHistoryLoading = useSelector((state) => state.slice.loading.history);
  const totalValueInHistory = useSelector((state) => state.slice.data.history?.length);

  const [selectedValues, setSelectedValues] = useState({
    user: null,
    date: null,
    type: 'meal',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    callHistoryApi();
  }, [selectedValues, page, perPage]);

  const callHistoryApi = async () => {
    if (selectedValues.user) {
      const payload = { user_id: selectedValues.user, type: selectedValues.type };
      await dispatch(fetchHistory({ page: page + 1, perPage, payload })).then((action) =>
        setFilteredHistory(action.payload.data)
      );
    }
  };

  const TABLE_HEAD =
    selectedValues.type === 'meal'
      ? [
          { id: 'name', label: 'Diet', alignRight: false },
          { id: 'quantity', label: 'Quantity', alignRight: false },
          { id: 'mealtype', label: 'Meal Type', alignRight: false },
          { id: 'date', label: 'Date', alignRight: false },
          { id: 'status', label: 'Status', alignRight: false },
          { id: '' },
        ]
      : [
          { id: 'name', label: 'Workout', alignRight: false },
          { id: 'difficulty', label: 'Difficulty', alignRight: false },
          { id: 'date', label: 'Date', alignRight: false },
          { id: 'status', label: 'Status', alignRight: false },
          { id: '' },
        ];

  const options = customers.map((customer, index) => {
    return {
      customerName: `${customer.full_name}`,
      image: customer.image,
      customerId: customer._id,
      height: customer.height,
      weight: customer.current_weight,
    };
  });

  useEffect(() => {
    dispatch(fetchCustomer());
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
    console.log('event');
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setPerPage(parseInt(event.target.value, 10));
  };

  const searchFilter = (event) => {
    setPage(0);
    const nameToFilter = event.target.value.toLowerCase();

    const filterResult = history?.filter((item) => {
      // Check if the item's name or formatted date includes the input
      return (
        item?.meal?.name.toLowerCase().includes(nameToFilter) ||
        item?.workout_id?.name.toLowerCase().includes(nameToFilter) ||
        String(formatDate(item?.date)).toLocaleLowerCase().includes(nameToFilter)
      );
    });

    setFilterName(nameToFilter);
    setFilteredHistory(filterResult);
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
  const [selectedCustomerName, setselectedCustomerName] = useState('');

  const handleSelect = async (value, option) => {
    if (option && option.customerId) {
      console.log('option', option);
      setselectedCustomerName(option.customerName);
      setSelectedValues({ ...selectedValues, user: option.customerId });
    }
  };

  const handleSelectChange = (key, value) => {
    setSelectedValues({
      ...selectedValues,
      [key]: value,
    });
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * perPage - Totalpage) : 0;

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  const [DrawerOpen, setDrawerOpen] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const onClose = () => {
    setDrawerOpen(false);
  };
  const containerStyle = {
    // position: 'relative',
    // height: '100%',
    // padding: 48,
    overflow: 'hidden',
    // textAlign: 'center',
    // background: 'white',
    borderRadius: '5px',
  };
  return (
    <div>
      <Helmet>
        <title> History | Minimal UI </title>
      </Helmet>

      <Container>
        <Row style={{ margin: '10px 0px', gap: '10px', display: 'flex' }}>
          <Col>
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              style={{ width: '100%', minWidth: 350, maxWidth: 500, overflow: 'auto' }}
              value={selectedCustomerName}
              options={options?.map((option, index) => ({
                value: option.customerId,
                customerName: option.customerName,
                label: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={option.image} style={{ marginRight: '10px' }} /> {option.customerName}{' '}
                    <div>
                      <b>&nbsp; w</b>
                      {`: ${option.weight}kg `}
                      <b>h</b>
                      {`: ${option.height}ft`}
                    </div>
                  </div>
                ),
                customerId: option.customerId,
              }))}
              filterOption={(inputValue, option) =>
                option.customerName.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              onChange={(value) => setselectedCustomerName(value)}
              onSelect={handleSelect}
              size="large"
            >
              <Input.Search
                allowClear={{ clearIcon: <CloseSquareFilled /> }}
                onChange={(e) => e.target.value == '' && setSelectedValues({ ...selectedValues, user: null })}
                enterButton
                size="large"
                placeholder="Search User..."
              />
            </AutoComplete>
          </Col>
          <Col>
            <Select
              placeholder="select type"
              size="large"
              defaultValue={'meal'}
              value={selectedValues.type}
              disabled={!selectedValues.user}
              onChange={(value) => {
                setSelectedValues({ ...selectedValues, type: value });
              }}
              // style={{ width: '100%' }}
            >
              <Select.Option value="meal">Meal</Select.Option>
              <Select.Option value="workout">Workout</Select.Option>
            </Select>
          </Col>
          {/* <Col span={5}>
            <DatePicker onChange={(date) => handleSelectChange('date', date)} value={selectedValues.date} />
          </Col> */}
        </Row>

        <Card style={{ minHeight: '600px', borderRadius: '10px 10px 0px 0px' }}>
          <Drawer
            title="DIET PROOF"
            placement="right"
            closable={false}
            onClose={onClose}
            open={DrawerOpen}
            getContainer={false}
          >
            <Image width={'100%'} height={'250px'} src="https://takethemameal.com/files_images_v2/stam.jpg" />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Rate disabled defaultValue={2.5} />
            </div>
            <div>
              <TextArea
                rows={6}
                placeholder=""
                value={
                  "Thank you for providing me with this nutritious meal plan! I'm committed to following it diligently. I'll make sure to document each meal with a photo to show my progress. Looking forward to a healthier me!"
                }
                maxLength={6}
              />
            </div>
          </Drawer>
          <UserListToolbar
            numSelected={selected.length}
            history={history}
            filterName={filterName}
            onFilterName={searchFilter}
            openMenu={handleOpenFilter}
          />

          <Scrollbar>
            <Spin spinning={isHistoryLoading}>
              <TableContainer sx={{ minWidth: 800 }} style={containerStyle}>
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
                  {selectedValues.user == null || !history?.length ? (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {filteredHistory?.map((item) => {
                        const selectedUser = selected.indexOf(item?.meal?.name) !== -1;

                        return (
                          <TableRow hover key={item?._id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <>
                              {selectedValues.type == 'meal' ? (
                                <>
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={selectedUser}
                                      onChange={(event) => handleClick(event, item?.meal?.name)}
                                    />
                                  </TableCell>

                                  <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                      <Avatar alt={item?.meal?.name} src={item?.meal?.meal_image} />
                                      <Typography
                                        variant="subtitle2"
                                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                        noWrap
                                        component={Link}
                                        to={`/dashboard/user/customer/id`}
                                      >
                                        {item?.meal?.name}
                                      </Typography>
                                    </Stack>
                                  </TableCell>

                                  <TableCell align="left">
                                    {item?.quantity?.value + ' ' + item?.quantity?.type}
                                  </TableCell>

                                  <TableCell align="left">{item?.meal_period}</TableCell>
                                </>
                              ) : (
                                <>
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={selectedUser}
                                      onChange={(event) => handleClick(event, item?.workout_id?.name)}
                                    />
                                  </TableCell>

                                  <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                      <Avatar alt={item?.workout_id?.name} src={item?.workout_id?.image} />
                                      <Typography
                                        variant="subtitle2"
                                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                        noWrap
                                        component={Link}
                                        to={`/dashboard/user/customer/id`}
                                      >
                                        {item?.workout_id?.name}
                                      </Typography>
                                    </Stack>
                                  </TableCell>

                                  <TableCell align="left">{item?.difficulty}</TableCell>
                                </>
                              )}
                            </>

                            <TableCell align="left">{formatDate(item?.date)}</TableCell>
                            <TableCell
                              align="left"
                              onClick={item?.user_picked && showDrawer}
                              style={{ cursor: item?.user_picked && 'pointer' }}
                            >
                              {!item?.user_picked && !item?.user_skip ? (
                                <Tag color="yellow">{'pending'}</Tag>
                              ) : item?.user_skip ? (
                                <Tag color="red">{'skipped'}</Tag>
                              ) : (
                                item?.user_picked && <Tag color="green">{'consumed'}</Tag>
                              )}
                              {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                            </TableCell>

                            <TableCell align="right">
                              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}

                      {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Spin>
          </Scrollbar>
        </Card>
        <Card style={{ borderRadius: '0px 0px 10px 10px' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalValueInHistory}
            rowsPerPage={perPage}
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
      {/* <div style={containerStyle}> */}

      {/* </div> */}
    </div>
  );
}
