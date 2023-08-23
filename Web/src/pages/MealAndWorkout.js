import { AutoComplete, Input, Segmented, Col, Row, Select, Space, DatePicker, Button, Avatar, Card, Typography, Tabs, Divider, Modal, Form } from 'antd';
import React, { useRef, useState } from 'react'
import { History, PlusOneOutlined } from '@mui/icons-material';
import "../styles/button.css"
import "../styles/usercard.css"
import { Box, IconButton } from '@mui/material';
import { Add } from '@material-ui/icons';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
// import { AppNewsUpdate } from '../sections/@dashboard/app';
import HealthSnapshot from '../components/HealthCard';

const index = 0;
const MealAndWorkout = () => {
  const { Paragraph, Text } = Typography;
  const navigate =useNavigate()
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
        <span>
          {/* <UserOutlined /> {count} */}
        </span>
      </div>
    ),
  });

  const { TabPane } = Tabs;
  const handleTabChange = (activeKey) => {
    // Handle tab change here if needed
  };

  const options = [
    { value: 'Vishnu' },
    { value: 'Lakshay' },
    { value: 'Mohit' },
    { value: 'Deepak' },
  ];

  const [items, setItems] = useState(['Rice', 'Curd',"Peanut Butter"]);
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

  return (
    <>
      <Segmented options={['Meal', 'Workout']} />
      <Row style={{ marginTop: 5 }} gutter={16}>
        <Col span={6} style={{ marginTop: "7px" }}>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            // dropdownMatchSelectWidth={500}
            style={{ width: 250 }}
            options={options}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input.Search size="large" placeholder="Search here" />
          </AutoComplete>
        </Col>
        <Col span={16}  >
          <Space size={8} align='' style={{ background: "#f0f2f5", padding: "10px", borderRadius: "5px" }}>
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
        <Col span={2} >
          <IconButton
            className="custom-button"
<<<<<<< Updated upstream
            sx={{ backgroundColor: '#1890ff', color: '#fff', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
=======
            onClick={() => navigate('add-item')}
            sx={{
              backgroundColor: '#1890ff',
              color: '#fff',
              borderRadius: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
>>>>>>> Stashed changes
          >
            Add <Add />
          </IconButton>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 10 }}>
        <Col span={8} >
          <Card
            bordered={false}
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '8px',
            }}
          >
            <Box display='flex' justifyContent={"center"}>
              <Avatar size={100} src="/assets/images/avatars/avatar_1.jpg" />
            </Box>
            <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>User Name</h2>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', }}>
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
            <Box display="flex" justifyContent={"center"} >

            <IconButton
              className="custom-button"
              onClick={()=>navigate("/dashboard/history")}
              sx={{ backgroundColor: '#1890ff', color: '#fff', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              View History <History />
            </IconButton>
            </Box>
          </Card>

        </Col>
        <Col span={16} >
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
<<<<<<< Updated upstream
          <Modal
            title="Add New Meal"
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            <Form layout="vertical">
              <Form.Item label="Title" name="title" style={{ marginBottom: 8 }}>
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description" style={{ marginBottom: 8 }}>
                <Input />
              </Form.Item>
              <Form.Item label="YouTube Video Link" name="youtubeLink" style={{ marginBottom: 8 }}>
                <Input />
              </Form.Item>
              <Form.Item label="Quantity" name="quantity" style={{ marginBottom: 0 }}>
                <Select style={{ width: 150 }}>
                  <Select.Option value="200gm">200gm</Select.Option>
                  <Select.Option value="400gm">400gm</Select.Option>
                  <Select.Option value="600gm">600gm</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>

=======
>>>>>>> Stashed changes
        </Col>
      </Row>
    </>
  );
}

export default MealAndWorkout