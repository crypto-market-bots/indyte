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
  Image,
  Empty,
  InputNumber,
} from 'antd';

import React, { useEffect, useRef, useState } from 'react';
import { History, PlusOneOutlined, Add, HdrPlusOutlined, Delete } from '@mui/icons-material';
import '../styles/button.css';
import '../styles/usercard.css';
import { Box, IconButton, Stack } from '@mui/material';
import { PlusOutlined, CloseSquareFilled } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
// import { AppNewsUpdate } from '../sections/@dashboard/app';
import HealthSnapshot from '../components/HealthCard';
import {
  addUserMealRecommendation,
  fetchCustomer,
  fetchCustomerDetails,
  fetchMeal,
  fetchUserMealRecommendation,
} from 'src/utils/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { border } from '@chakra-ui/react';

const index = 0;
const MealAndWorkout = () => {
  const { Paragraph, Text } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.slice.data.customers);
  const meals = useSelector((state) => state.slice.data.meals);
  let customerDetails = useSelector((state) => state.slice.data.customerDetails);
  customerDetails = customerDetails[0];
  const userMealRecommendation = useSelector((state) => state.slice.data.userMealRecommendation);
  console.log('userMealRecommendation', userMealRecommendation);

  // const options = [{ value: 'Vishnu' }, { value: 'Lakshay' }, { value: 'Mohit' }, { value: 'Deepak' }];
  const options = customers.map((customer, index) => {
    return {
      value: `${customer.first_name} ${customer.last_name}`,
      image: customer.image,
      customerId: customer._id,
    };
  });

  const quantityTypes = ['gm', 'kg', 'ml', 'oz', 'lb', 'other'];
  const [selectedValues, setSelectedValues] = useState({
    user: null,
    meal: null,
    mealId: null,
    type: null,
    quantity: {
      value: null,
      type: null,
    },
    date: null,
  });

  const handleSelectChange = (key, value) => {
    setSelectedValues({
      ...selectedValues,
      [key]: value,
    });
  };

  const handleQuantityTypeChange = (type) => {
    setSelectedValues({
      ...selectedValues,
      quantity: {
        ...selectedValues.quantity,
        type,
      },
    });
  };

  const addItem = async () => {
    console.log('Selected values :', selectedValues);
    const payload = {
      user_id: selectedValues.user,
      meal_id: selectedValues.mealId,
      quantity: selectedValues.quantity,
      meal_period: selectedValues.type,
      date: selectedValues.date,
    };
    await dispatch(addUserMealRecommendation(payload));
    dispatch(fetchUserMealRecommendation(payload.user_id));
  };

  useEffect(() => {
    dispatch(fetchCustomer());
    dispatch(fetchMeal());
  }, []);

  const handleSelect = async (value, option) => {
    if (option && option.customerId) {
      setSelectedValues({ ...selectedValues, user: option.customerId });
      await dispatch(fetchCustomerDetails(option.customerId));
      dispatch(fetchUserMealRecommendation(option.customerId));
    }
  };

  const handleMealSelectChange = (value) => {
    const selectedMeal = meals.find((meal) => meal.name === value);

    // Check if the selectedMeal exists and has an _id property
    if (selectedMeal && selectedMeal._id) {
      setSelectedValues({ ...selectedValues, mealId: selectedMeal._id, meal: value });
    }
  };

  return (
    <>
      <Segmented options={['Meal', 'Workout']} />
      <Row style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }} gutter={16}>
        <Col span={6} style={{ marginTop: '7px' }}>
          <AutoComplete
            // popupClassName="certain-category-search-dropdown"
            style={{ width: '100%' }}
            options={options.map((option, index) => ({
              value: option.value,
              label: (
                <div>
                  <Avatar src={option.image} /> {option.value}
                </div>
              ),
              customerId: option.customerId,
            }))}
            filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            onSelect={handleSelect}
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
          >
            <Input size="large" placeholder="Search here" />
          </AutoComplete>
        </Col>
        <Col span={16}>
          <div>
            <Space
              size={8}
              align=""
              style={{
                background: '#f0f2f5',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <Select
                style={{ width: 150 }}
                placeholder="Meal"
                onChange={handleMealSelectChange}
                value={selectedValues.meal}
              >
                {meals?.map((meal, index) => (
                  <Select.Option key={index} value={meal.name}>
                    <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
                      <Image width={20} height={20} style={{ borderRadius: '50%' }} src={meal.image} />{' '}
                      <span>{meal.name}</span>
                    </Stack>
                  </Select.Option>
                ))}
              </Select>

              <Select
                placeholder="type"
                style={{ width: 150 }}
                onChange={(value) => handleSelectChange('type', value)}
                value={selectedValues.type}
              >
                <Select.Option value="BREAKFAST">Breakfast</Select.Option>
                <Select.Option value="LUNCH">Lunch</Select.Option>
                <Select.Option value="DINNER">Dinner</Select.Option>
                <Select.Option value="SNACKS">Snacks</Select.Option>
              </Select>
              <Input
                // style={{ width: 150 }}
                placeholder="Quantity"
                value={selectedValues.quantity.value || ''}
                onChange={(e) => handleSelectChange('quantity', { ...selectedValues.quantity, value: e.target.value })}
              />
              <Select
                placeholder="Unit"
                // style={{ width: 150 }}
                onChange={(value) => handleQuantityTypeChange(value)}
                value={selectedValues.quantity.type}
              >
                {quantityTypes.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
              <DatePicker onChange={(date) => handleSelectChange('date', date)} value={selectedValues.date} />
              <Button type="primary" disabled={!customerDetails || !selectedValues.meal} onClick={addItem}>
                Add meal
              </Button>
            </Space>
          </div>
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
              // height: '480px',
            }}
          >
            {customerDetails ? (
              <>
                <Box display="flex" justifyContent={'center'}>
                  <Avatar size={100} src={customerDetails?.image} />
                </Box>
                <h2
                  style={{ marginBottom: '10px', textAlign: 'center' }}
                >{`${customerDetails?.first_name} ${customerDetails?.last_name}`}</h2>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Text strong>Height:</Text>
                    <Text>{customerDetails?.height} cm</Text>
                  </div>
                  {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Waist:</Text>
                <Text>75 cm</Text>
              </div> */}
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Text strong>Weight:</Text>
                    <Text>{customerDetails?.weight} kg</Text>
                  </div>
                  {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Dietary Habits:</Text>
                <Text>Vegetarian</Text>
              </div> */}
                  {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Food Allergy:</Text>
                <Text>None</Text>
              </div> */}
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Text strong>Health Goals:</Text>
                    <Text>{customerDetails?.goal}</Text>
                  </div>
                  {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text strong>Food Frequency:</Text>
                <Text>3 meals per day</Text>
              </div> */}
                </div>
                <Box display="flex" justifyContent={'space-around'}>
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
                  {/* <IconButton
                className="custom-button"
                sx={{
                  backgroundColor: '#1890ff',
                  color: '#fff',
                  borderRadius: '5px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => navigate('add-item')}
              >
                Add Meal
                <Add />
              </IconButton> */}
                </Box>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Text strong>Please select a customer from the dropdown to view their data.</Text>
                {/* You can add more content or instructions here */}
              </div>
            )}
          </Card>
        </Col>
        <Col span={16}>
          <HealthSnapshot
            title="Meal Update"
            list={userMealRecommendation?.map((item, index) => ({
              id: item._id,
              image: item.meal.image,
              foodName: item.meal.name,
              mealType: item.meal_period,
              quantity: `${item.quantity.value} ${item.quantity.type}`,
            }))}
            isEmpty={!customerDetails}
          />
        </Col>
      </Row>
    </>
  );
};

export default MealAndWorkout;
