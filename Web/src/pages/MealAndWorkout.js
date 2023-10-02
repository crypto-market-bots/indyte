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
  addUserWorkoutRecommendation,
  fetchCustomer,
  fetchCustomerDetails,
  fetchMeal,
  fetchUserMealRecommendation,
  fetchUserWorkoutRecommendation,
  fetchWorkouts,
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
  const workouts = useSelector((state) => state.slice.data.workouts);
  console.log('workout', workouts, 'meals', meals);
  let customerDetails = useSelector((state) => state.slice.data.customerDetails);
  customerDetails = customerDetails[0];
  const userMealRecommendation = useSelector((state) => state.slice.data.userMealRecommendation);
  const userWorkoutRecommendation = useSelector((state) => state.slice.data.userWorkoutRecommendation);
  const [date, setDate] = useState({
    workout: new Date(),
    meal: new Date(),
  });
  console.log(
    'user meal recommenndation',
    userMealRecommendation,
    'user workout recommendation ',
    userWorkoutRecommendation
  );
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
    workout: null,
    workoutId: null,
    difficulty: null,
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

  const addMeal = async () => {
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

  const addWorkout = async () => {
    console.log('Selected values :', selectedValues);
    const payload = {
      user_id: selectedValues.user,
      workout_id: selectedValues.workoutId,
      difficulty: selectedValues.difficulty,
      date: selectedValues.date,
    };
    await dispatch(addUserWorkoutRecommendation(payload));
    dispatch(fetchUserWorkoutRecommendation({ user_id: payload.user_id, type: 'all', date: '2023-10-02' }));
  };

  useEffect(() => {
    dispatch(fetchCustomer());
    dispatch(fetchMeal());
    dispatch(fetchWorkouts());
  }, []);

  const handleSelect = async (value, option) => {
    if (option && option.customerId) {
      setSelectedValues({ ...selectedValues, user: option.customerId });
      await dispatch(fetchCustomerDetails(option.customerId));
      dispatch(fetchUserMealRecommendation(option.customerId));
      dispatch(fetchUserWorkoutRecommendation({ user_id: option.customerId, type: 'all', date: date.workout }));
    }
  };

  const handleMealSelectChange = (value) => {
    const selectedMeal = meals?.find((meal) => meal.name === value);

    // Check if the selectedMeal exists and has an _id property
    if (selectedMeal && selectedMeal._id) {
      setSelectedValues({ ...selectedValues, mealId: selectedMeal._id, meal: value });
    }
  };

  const handleWorkoutSelectChange = (value) => {
    const selectedWorkout = workouts?.find((workout) => workout.name === value);

    // Check if the selectedMeal exists and has an _id property
    if (selectedWorkout && selectedWorkout._id) {
      setSelectedValues({ ...selectedValues, workoutId: selectedWorkout._id, workout: value });
    }
  };

  const [selectedType, setSelectedType] = useState('Meal');

  const handleSegmentedChange = (selectedOption) => {
    setSelectedType(selectedOption);
    console.log('type ', selectedOption);
  };

  const handleSetWorkoutDate = async (selectedDate, formattedDate) => {
    console.log('selected date is ', selectedDate);
    setDate({ ...date, workout: selectedDate });
    if (selectedDate)
      await dispatch(
        fetchUserWorkoutRecommendation({ user_id: selectedValues.user, type: 'date', date: formattedDate })
      );
    else
      await dispatch(
        fetchUserWorkoutRecommendation({ user_id: selectedValues.user, type: 'all', date: formattedDate })
      );
  };
  // const handleSetMealDate = async (selectedDate) => {
  //   // console.log('selected date is ', selectedDate);
  //   setDate({ ...date, meal: selectedDate });
  //   if (selectedDate)
  //     await dispatch(
  //       fetchUserWorkoutRecommendation({ user_id: selectedValues.user, type: 'date', date: date.workout })
  //     );
  //   else
  //     await dispatch(fetchUserWorkoutRecommendation({ user_id: selectedValues.user, type: 'all', date: date.workout }));
  // };

  return (
    <>
      <Segmented size="large" block options={['Meal', 'Workout']} onChange={handleSegmentedChange} />
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
            {selectedType == 'Workout' ? (
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
                  placeholder="Workout"
                  onChange={handleWorkoutSelectChange}
                  value={selectedValues.workout}
                >
                  {workouts?.map((workout, index) => (
                    <Select.Option key={index} value={workout?.name}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <Image
                          src={workout.image}
                          // alt={workout.name}
                          style={{
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain', // This property ensures that the image covers its container without stretching
                            maxWidth: '30px', // Set a maximum width to prevent the image from exceeding a certain size
                            maxHeight: '30px', // Set a maximum height to prevent the image from exceeding a certain size
                            marginRight: '8px',
                            borderRadius: '10%',
                          }}
                        />
                        <Typography.Text>{workout?.name}</Typography.Text>
                      </Stack>
                    </Select.Option>
                  ))}
                </Select>

                <Select
                  placeholder="difficulty"
                  style={{ width: 150 }}
                  onChange={(value) => handleSelectChange('difficulty', value)}
                  value={selectedValues.difficulty}
                >
                  <Select.Option value="BEGINNER">Beginner</Select.Option>
                  <Select.Option value="INTERMEDIATE">intermediate</Select.Option>
                  <Select.Option value="HARD">hard</Select.Option>
                </Select>

                <DatePicker onChange={(date) => handleSelectChange('date', date)} value={selectedValues.date} />
                <Button
                  type="primary"
                  disabled={
                    !customerDetails || !selectedValues.workout || !selectedValues?.difficulty || !selectedValues.date
                  }
                  onClick={addWorkout}
                >
                  Add Workout
                </Button>
              </Space>
            ) : (
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
                      <Stack direction={'row'} alignItems={'center'}>
                        <Image
                          src={meal.meal_image}
                          alt={meal.name}
                          style={{
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain', // This property ensures that the image covers its container without stretching
                            maxWidth: '30px', // Set a maximum width to prevent the image from exceeding a certain size
                            maxHeight: '30px', // Set a maximum height to prevent the image from exceeding a certain size
                            marginRight: '8px',
                            borderRadius: '10%',
                          }}
                        />
                        <Typography.Text>{meal.name}</Typography.Text>
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
                  onChange={(e) =>
                    handleSelectChange('quantity', { ...selectedValues.quantity, value: e.target.value })
                  }
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
                <Button type="primary" disabled={!customerDetails || !selectedValues.meal} onClick={addMeal}>
                  Add meal
                </Button>
              </Space>
            )}
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
          {selectedType == 'Meal' ? (
            <HealthSnapshot
              title="Meal Update"
              date={date.meal}
              filterResult={(selectedDate) => setDate({ ...date, meal: selectedDate })}
              list={userMealRecommendation?.map((item, index) => ({
                id: item._id,
                image: item.meal?.meal_image || '',
                mealCompletionImage: item.meal_image_proof,
                isConsumedmeal: item.user_picked,
                isSkipMeal: item.user_skip,
                foodName: item.meal.name,
                mealType: item.meal_period,
                quantity: `${item.quantity.value} ${item.quantity.type}`,
              }))}
              isEmpty={!customerDetails || !userMealRecommendation?.length}
            />
          ) : (
            <HealthSnapshot
              title="Workout Update"
              date={date.workout}
              filterResult={handleSetWorkoutDate}
              list={userWorkoutRecommendation?.map((item, index) => ({
                id: item._id,
                image: item.workout_id?.image || '',
                foodName: item.workout_id.name,
                mealType: item.difficulty,
                // quantity: `${item.quantity.value} ${item.quantity.type}`,
              }))}
              isEmpty={!customerDetails || !userWorkoutRecommendation?.length}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default MealAndWorkout;
