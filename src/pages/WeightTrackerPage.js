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
  Empty,
  Form,
  Input,
  Button,
  InputNumber,
  Modal,
  Row,
  Segmented,
  Select,
  Space,
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
import { fetchCustomer, fetchCustomerDetails, fetchHistory, getWeights, updateWeights } from 'src/utils/apiCalls';
import { useForm } from 'antd/es/form/Form';
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

export default function WeightTrackerPage() {
  const [open, setOpen] = useState(null);

  const [openFilter, setOpenFilter] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const history = useSelector((state) => state.slice.data.history?.data);
  const weights = useSelector((state) => state.slice.data.weights);

  const [filteredHistory, setFilteredHistory] = useState(history);

  const [perPage, setPerPage] = useState(5);

  const [selectedRow, setSelectedRow] = useState({});

  const customers = useSelector((state) => state.slice.data.customers);

  const isHistoryLoading = useSelector((state) => state.slice.loading.history);
  const totalValueInHistory = useSelector((state) => state.slice.data.history?.length);

  const [selectedValues, setSelectedValues] = useState({
    user: null,
    date: null,
    type: 'pending',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    callGetWeightsApi();
  }, [selectedValues, page, perPage]);

  const callGetWeightsApi = async () => {
    console.log(selectedValues);
    if (selectedValues.user) {
      const payload = { id: selectedValues.user, type: selectedValues.type };
      await dispatch(getWeights(payload));
    }
  };

  const handleSelectCustomer = (selectedCustomer) => {
    setselectedCustomerName(selectedCustomer);
  };

  const TABLE_HEAD = [
    { id: 'proof_image', label: 'Proof Image', alignRight: false },
    { id: 'current_weight', label: 'Current Weight', alignRight: false },
    { id: 'goal_weight', label: 'Goal Weight', alignRight: false },
    { id: 'createdAt', label: 'Date', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
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
  const [selectedCustomerName, setselectedCustomerName] = useState('');

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

  const handleOpenMenu = (event, rowData) => {
    setOpen(event.currentTarget);
    setSelectedRow(rowData);
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

  const [editRowData, setEditRowData] = useState({});
  const handleEdit = async () => {
    await setEditRowData({
      current_weight: selectedRow?.current_weight,
      goal_weight: selectedRow?.goal_weight,
      status: selectedRow?.status,
    });
    setIsModalOpen(true);
    setOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Option } = Select;

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const payload = {
      ...values,
      user_id: selectedRow?.user,
      weight_tracking_id: selectedRow?._id,
    };
    await dispatch(updateWeights(payload));
    if (selectedValues.user) {
      const payload = { id: selectedValues.user, type: selectedValues.type };
      await dispatch(getWeights(payload));
    }
    setIsModalOpen(false);
  };

  // Inside your component...
  const [form] = useForm();

  // Ensure you update the form fields when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      form.setFieldsValue({
        status: selectedRow.status,
        current_weight: selectedRow.current_weight,
        goal_weight: selectedRow.goal_weight,
      });
    }
  }, [selectedRow]);
  return (
    <>
      <Helmet>
        <title> Weight Tracker | Minimal UI </title>
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
              onChange={handleSelectCustomer}
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
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
              <Select.Option value="edit">Edited</Select.Option>
            </Select>
          </Col>
          {/* <Col span={5}>
            <DatePicker onChange={(date) => handleSelectChange('date', date)} value={selectedValues.date} />
          </Col> */}
        </Row>

        <Card>
          {/* <UserListToolbar
            numSelected={selected.length}
            history={history}
            // filterName={filterName}
            // onFilterName={searchFilter}
            // openMenu={handleOpenFilter}
          /> */}

          <Scrollbar>
            <Spin spinning={isHistoryLoading}>
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
                  {selectedValues.user == null || !weights?.length ? (
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
                      {weights?.map((item) => {
                        const selectedUser = selected.indexOf(item?.meal?.name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={item?._id}
                            // sx={{ width: '100%' }}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedUser}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedUser}
                                onChange={(event) => handleClick(event, item?.meal?.name)}
                              />
                            </TableCell>

                            <TableCell align="left">
                              <Stack direction="row" display={'flex'} justifyContent={'start'} alignItems="center">
                                <Avatar
                                  alt={'proof image'}
                                  style={{ width: '60px', height: '60px' }}
                                  src={item?.proof_image}
                                />
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{`${item?.current_weight} kg`}</TableCell>

                            <TableCell align="left">{`${item?.goal_weight} kg`}</TableCell>
                            <TableCell align="left">{formatDate(item?.createdAt)}</TableCell>
                            <TableCell align="left">
                              {item?.status === 'pending' ? (
                                <Tag color="yellow">pending</Tag>
                              ) : item?.status === 'approved' ? (
                                <Tag color="green">approved</Tag>
                              ) : item?.status === 'rejected' ? (
                                <Tag color="red">rejected</Tag>
                              ) : (
                                <Tag color="blue">edited</Tag>
                              )}
                            </TableCell>

                            <TableCell align="left">
                              <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, item)}>
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Spin>
          </Scrollbar>

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
      <Modal title="Edit Data" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          layout="vertical"
          style={{ width: '100%' }}
          form={form} // Ensure you have access to the form instance
        >
          <Form.Item
            name="status"
            label="Status"
            hasFeedback
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Please select a status">
              <Option value="approved">Approved</Option>
              <Option value="rejected">Rejected</Option>
              <Option value="edit">Edited</Option>
            </Select>
          </Form.Item>

          <Form.Item name="current_weight" label="Current Weight">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="goal_weight" label="Goal Weight">
            <Input />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

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
        <MenuItem onClick={handleEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {/* 
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}
