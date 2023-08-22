import {
  AutoComplete,
  Input,
  Segmented,
  Col,
  Row,
  Select,
  Space,
  DatePicker,
  Button,
  Avatar,
  Card,
  Typography,
  Tabs,
  Divider,
  Modal,
  Form,
  Drawer,
} from 'antd';

import React, { useRef, useState } from 'react';
import { History, PlusOneOutlined, Add, HdrPlusOutlined, Delete } from '@mui/icons-material';
import '../styles/button.css';
import '../styles/usercard.css';
import { Box, IconButton } from '@mui/material';
import { PlusOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
// import { AppNewsUpdate } from '../sections/@dashboard/app';
import HealthSnapshot from '../components/HealthCard';

const index = 0;
const MealAndWorkout = () => {
  const { Paragraph, Text } = Typography;
  const navigate = useNavigate();
  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {title}
        <span>{/* <UserOutlined /> {count} */}</span>
      </div>
    ),
  });
  const { Option } = Select;
  const { TabPane } = Tabs;
  const handleTabChange = (activeKey) => {
    // Handle tab change here if needed
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const options = [{ value: 'Vishnu' }, { value: 'Lakshay' }, { value: 'Mohit' }, { value: 'Deepak' }];

  const [items, setItems] = useState(['Rice', 'Curd', 'Peanut Butter']);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === 'add') {
      // Show the modal dialog
      setIsModalVisible(true);
    } else {
      setSelectedOption(e.key);
    }
  };

  const handleModalOk = () => {
    // Perform any action you want when the "Add" button in the dialog is clicked
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    // Close the modal dialog
    setIsModalVisible(false);
  };

  const addItem = () => {
    setIsModalVisible(true);
  };

  const initialValues = {
    name: '',
    type: '',
    nutritions: [],
    description: '',
    ytlink1: '',
    ytlink2: '',
    image: '',
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAddButtonClick = () => {
    form.setFieldsValue(initialValues); // Reset the form fields
    setIsModalVisible(true);
  };

  return (
    <>
      <Segmented options={['Meal', 'Workout']} />
      <Row style={{ marginTop: 5 }} gutter={16}>
        <Col span={6} style={{ marginTop: '7px' }}>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            // dropdownMatchSelectWidth={500}
            style={{ width: 250 }}
            options={options}
            filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          >
            <Input.Search size="large" placeholder="Search here" />
          </AutoComplete>
        </Col>
        <Col span={16}>
          <Space size={8} align="" style={{ background: '#f0f2f5', padding: '10px', borderRadius: '5px' }}>
            <Select
              style={{
                width: 150,
              }}
              placeholder="meal"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: '8px 0',
                    }}
                  />
                  <Space
                    style={{
                      padding: '0 ',
                    }}
                  >
                    <Button type="link" onClick={addItem}>
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({
                label: item,
                value: item,
              }))}
            />
            <Select placeholder="type" style={{ width: 150 }}>
              <Select.Option value="Option 1">Breakfast</Select.Option>
              <Select.Option value="Option 2">Lunch</Select.Option>
              <Select.Option value="Option 3">Dinner</Select.Option>
            </Select>
            <Select placeholder="quantity" style={{ width: 150 }}>
              <Select.Option value="Option 1">200 gm</Select.Option>
              <Select.Option value="Option 2">400 gm</Select.Option>
              <Select.Option value="Option 3">600 gm</Select.Option>
            </Select>
            <DatePicker />
          </Space>
        </Col>
        <Col span={2}>
          <IconButton
            className="custom-button"
            onClick={showDrawer}
            sx={{
              backgroundColor: '#1890ff',
              color: '#fff',
              borderRadius: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Add <Add />
          </IconButton>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 10 }}>
        <Col span={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '8px',
            }}
          >
            <Box display="flex" justifyContent={'center'}>
              <Avatar size={100} src="/assets/images/avatars/avatar_1.jpg" />
            </Box>
            <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>User Name</h2>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Height:</Text>
                <Text>180 cm</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Waist:</Text>
                <Text>75 cm</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Weight:</Text>
                <Text>70 kg</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Dietary Habits:</Text>
                <Text>Vegetarian</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Food Allergy:</Text>
                <Text>None</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Health Goals:</Text>
                <Text>Weight Loss</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Food Frequency:</Text>
                <Text>3 meals per day</Text>
              </div>
            </div>
            <Box display="flex" justifyContent={'center'}>
              <IconButton
                className="custom-button"
                onClick={() => navigate('/dashboard/history')}
                sx={{
                  backgroundColor: '#1890ff',
                  color: '#fff',
                  borderRadius: '5px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                View History <History />
              </IconButton>
            </Box>
          </Card>
        </Col>
        <Col span={16}>
          <HealthSnapshot
            title="Meal Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.datatype.uuid(),
              title: faker.name.jobTitle(),
              description: faker.name.jobTitle(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
              foodName: 'Rice',
              mealType: 'Breakfast',
              quantity: '200gm',
            }))}
          />
          // Inside the return statement of your component
          <Drawer
            title="Create a new account"
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{
              paddingBottom: 80,
            }}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter user name',
                      },
                    ]}
                  >
                    <Input placeholder="Please enter user name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="url"
                    label="Url"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter url',
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: '100%',
                      }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="Please enter url"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="owner"
                    label="Owner"
                    rules={[
                      {
                        required: true,
                        message: 'Please select an owner',
                      },
                    ]}
                  >
                    <Select placeholder="Please select an owner">
                      <Option value="xiao">Xiaoxiao Fu</Option>
                      <Option value="mao">Maomao Zhou</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose the type',
                      },
                    ]}
                  >
                    <Select placeholder="Please choose the type">
                      <Option value="private">Private</Option>
                      <Option value="public">Public</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="approver"
                    label="Approver"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose the approver',
                      },
                    ]}
                  >
                    <Select placeholder="Please choose the approver">
                      <Option value="jack">Jack Ma</Option>
                      <Option value="tom">Tom Liu</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="DateTime"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose the dateTime',
                      },
                    ]}
                  >
                    <DatePicker.RangePicker
                      style={{
                        width: '100%',
                      }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="please enter url description" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </Col>
      </Row>
    </>
  );
};

export default MealAndWorkout;
