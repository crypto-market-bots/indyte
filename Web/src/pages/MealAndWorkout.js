import { AutoComplete, Input, Segmented, Col, Row, Select, Space, DatePicker, Button, Avatar, Card, Typography, Tabs } from 'antd';
import React from 'react'
import { History } from '@mui/icons-material';
import "../styles/button.css"
import "../styles/usercard.css"
import { Box, IconButton } from '@mui/material';
import { Add } from '@material-ui/icons';
import { faker } from '@faker-js/faker';
// import { AppNewsUpdate } from '../sections/@dashboard/app';
import HealthSnapshot from '../components/HealthCard';

const MealAndWorkout = () => {
  const { Paragraph, Text } = Typography;
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
    {
      label: renderTitle('Libraries'),
      options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
      label: renderTitle('Solutions'),
      options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
      label: renderTitle('Articles'),
      options: [renderItem('AntDesign design language', 100000)],
    },
  ];
  return (
    <>
      <Segmented options={['Meal', 'Workout']} 
 />
      <Row style={{ marginTop: 5 }} gutter={16}>
        <Col span={6} style={{ marginTop: "7px" }}>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{ width: 250 }}
            options={options}
          >
            <Input.Search size="large" placeholder="Search here" />
          </AutoComplete>
        </Col>
        <Col span={16}  >
          <Space size={8} align='' style={{ background: "#f0f2f5", padding: "10px", borderRadius: "5px" }}>
            <Select defaultValue="Dropdown 1" style={{ width: 150 }}>
              <Select.Option value="Option 1">Option 1</Select.Option>
              <Select.Option value="Option 2">Option 2</Select.Option>
              <Select.Option value="Option 3">Option 3</Select.Option>
            </Select>
            <Select defaultValue="Dropdown 2" style={{ width: 150 }}>
              <Select.Option value="Option 1">Option 1</Select.Option>
              <Select.Option value="Option 2">Option 2</Select.Option>
              <Select.Option value="Option 3">Option 3</Select.Option>
            </Select>
            <Select defaultValue="Dropdown 3" style={{ width: 150 }}>
              <Select.Option value="Option 1">Option 1</Select.Option>
              <Select.Option value="Option 2">Option 2</Select.Option>
              <Select.Option value="Option 3">Option 3</Select.Option>
            </Select>
            <DatePicker />
          </Space>
        </Col>
        <Col span={2} >
          <IconButton
            className="custom-button"
            sx={{ backgroundColor: '#1890ff', color: '#fff', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
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

        </Col>
      </Row>
    </>
  );
}

export default MealAndWorkout