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
  Rate,
} from 'antd';

import React, { useEffect, useRef, useState } from 'react';
import { History, PlusOneOutlined, Add, HdrPlusOutlined, Delete } from '@mui/icons-material';
import '../styles/button.css';
import '../styles/usercard.css';
import { Box, IconButton, Stack, Switch } from '@mui/material';
import { PlusOutlined, CloseSquareFilled } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
// import { AppNewsUpdate } from '../sections/@dashboard/app';
import HealthSnapshot from '../components/HealthCard';
import dayjs from 'dayjs';

import {
  addUserMealRecommendation,
  addUserWorkoutRecommendation,
  fetchCustomer,
  fetchCustomerDetails,
  fetchMeal,
  fetchUserMealRecommendation,
  fetchUserWorkoutRecommendation,
  fetchWorkouts,
  updateUserMealRecommendation,
} from 'src/utils/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { border } from '@chakra-ui/react';
import { valuesIn } from 'lodash';
import TextArea from 'antd/es/input/TextArea';

const index = 0;
const MealAndWorkout = () => {
  const { Paragraph, Text } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.slice.data.customers);
  const meals = useSelector((state) => state.slice.data.meals);
  const workouts = useSelector((state) => state.slice.data.workouts);

  let customerDetails = useSelector((state) => state.slice.data.customerDetails);
  // customerDetails = customerDetails[0];
  const userMealRecommendation = useSelector((state) => state.slice.data.userMealRecommendation);
  const userWorkoutRecommendation = useSelector((state) => state.slice.data.userWorkoutRecommendation);
  const [date, setDate] = useState({
    workout: new Date(),
    meal: new Date(),
  });
  const [filterDate, setFilterDate] = useState({
    workout: null,
    meal: null,
  });
  const [isEdit, setIsEdit] = useState({
    workout: false,
    meal: false,
  });

  const options = customers?.map((customer, index) => {
    return {
      name: `${customer.full_name}`,
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
    const payload = {
      user_id: selectedValues.user,
      meal_id: selectedValues.mealId,
      quantity: selectedValues.quantity,
      meal_period: selectedValues.type,
      date: selectedValues.date,
    };
    await dispatch(addUserMealRecommendation(payload));

    const formattedDate = selectedValues.date.format('YYYY-MM-DD');
    setFilterDate({ ...filterDate, meal: selectedValues.date });
    dispatch(fetchUserMealRecommendation({ user_id: payload.user_id, type: 'date', date: formattedDate }));
  };

  const formatDate = (date) => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addWorkout = async () => {
    const payload = {
      user_id: selectedValues.user,
      workout_id: selectedValues.workoutId,
      difficulty: selectedValues.difficulty,
      date: selectedValues.date,
    };
    await dispatch(addUserWorkoutRecommendation(payload));
    const formattedDate = selectedValues.date.format('YYYY-MM-DD');
    setFilterDate({ ...filterDate, workout: selectedValues.date });
    dispatch(fetchUserWorkoutRecommendation({ user_id: payload.user_id, type: 'date', date: formattedDate }));
  };

  useEffect(() => {
    dispatch(fetchCustomer());
    dispatch(fetchMeal());
    dispatch(fetchWorkouts());
  }, []);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');

  const handleSelect = async (value, option) => {
    setSelectedCustomerName(option.customerName);
    const today = dayjs();
    const formattedDate = today.format('YYYY-MM-DD');
    setFilterDate({ meal: today, workout: today });
    if (option && option.customerId) {
      setSelectedValues({ ...selectedValues, user: option.customerId });
      await dispatch(fetchCustomerDetails(option.customerId));
      dispatch(fetchUserMealRecommendation({ user_id: option.customerId, type: 'date', date: formattedDate }));
      dispatch(fetchUserWorkoutRecommendation({ user_id: option.customerId, type: 'date', date: formattedDate }));
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
  };

  const handleSetMealDate = async (selectedDate, formattedDate) => {
    setFilterDate({ ...filterDate, meal: selectedDate });
    if (selectedDate)
      await dispatch(fetchUserMealRecommendation({ user_id: selectedValues.user, type: 'date', date: formattedDate }));
    else
      await dispatch(fetchUserMealRecommendation({ user_id: selectedValues.user, type: 'all', date: formattedDate }));
  };
  const handleSetWorkoutDate = async (selectedDate, formattedDate) => {
    setFilterDate({ ...filterDate, workout: selectedDate });

    if (selectedDate)
      await dispatch(
        fetchUserWorkoutRecommendation({ user_id: selectedValues.user, type: 'date', date: formattedDate })
      );
    else
      await dispatch(
        fetchUserWorkoutRecommendation({ user_id: selectedValues.user, type: 'all', date: formattedDate })
      );
  };

  const handleEdit = async (values) => {
    if (values.section === 'meal') {
      setIsEdit({ ...isEdit, meal: true });

      let quantity = values.quantity.split(' ');
      const selectedMeal = meals?.find((meal) => meal.name === values.Name);

      // Check if the selectedMeal exists and has an _id property
      if (selectedMeal && selectedMeal._id) {
        await setSelectedValues({
          ...selectedValues,
          mealId: selectedMeal._id,
          meal: values.Name,
          type: values.Type,
          date: dayjs(values.date),
          quantity: { value: quantity[0], type: quantity[1] },
        });
      }
    } else {
      setIsEdit({ ...isEdit, workout: true });
      const selectedWorkout = workouts?.find((workout) => workout.name === values.Name);

      // Check if the selectedMeal exists and has an _id property
      if (selectedWorkout && selectedWorkout._id) {
        setSelectedValues({
          ...selectedValues,
          workoutId: selectedWorkout._id,
          workout: values.workout_Name,
          difficulty: values.Type,
          date: dayjs(values.date),
        });
      }
      // Check if the selectedMeal exists and has an _id property
      // if (selectedMeal && selectedMeal._id) {
      //   await setSelectedValues({
      //     ...selectedValues,
      //     mealId: selectedMeal._id,
      //     meal: values.Name,
      //     type: values.Type,
      //     date: dayjs(values.date),
      //     quantity: { value: quantity[0], type: quantity[1] },
      //   });
      // }
    }
  };

  const updateMeal = () => {
    setIsEdit({ ...isEdit, meal: false });

    const mealId = selectedValues.mealId;
  };
  const updateWorkout = () => {
    setIsEdit({ ...isEdit, workout: false });
    const WorkoutId = selectedValues.workoutId;
  };
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [rowData, setrowData] = useState({});

  const handleConsumed = (rowData) => {
    setrowData(rowData);
    console.log(rowData);
    setDrawerOpen(true);
  };

  return (
    <>
      <Segmented size="large" block options={['Meal', 'Workout']} onChange={handleSegmentedChange} />
      <Row style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }} gutter={16}>
        <Col span={6} style={{ marginTop: '7px' }}>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            style={{ width: '100%' }}
            value={selectedCustomerName}
            options={options.map((option, index) => ({
              value: option.customerId,
              customerName: option.name,
              label: (
                <div key={index}>
                  <Avatar src={option.image} /> {option.name}
                </div>
              ),
              customerId: option.customerId,
            }))}
            filterOption={(inputValue, option) =>
              option.customerName?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={handleSelect}
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
            onChange={(value) => setSelectedCustomerName(value)}
            onClear={() => setSelectedCustomerName('')}
          >
            <Input size="large" placeholder="Search here" />
          </AutoComplete>
        </Col>
        <Col span={16}>
          <div>
            {selectedType === 'Workout' ? (
              <Space
                size={8}
                align=""
                style={{
                  background: '#f0f2f5',
                  padding: '10px',
                  borderRadius: '5px',
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                <Select placeholder="Workout" onChange={handleWorkoutSelectChange} value={selectedValues.workout}>
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
                        <Typography.Text>{workout?.workout_name}</Typography.Text>
                      </Stack>
                    </Select.Option>
                  ))}
                </Select>

                <Select
                  placeholder="difficulty"
                  onChange={(value) => handleSelectChange('difficulty', value)}
                  value={selectedValues.difficulty}
                >
                  <Select.Option value="BEGINNER">Beginner</Select.Option>
                  <Select.Option value="INTERMEDIATE">intermediate</Select.Option>
                  <Select.Option value="HARD">hard</Select.Option>
                </Select>

                <DatePicker
                  style={{ minWidth: 100 }}
                  onChange={(date) => handleSelectChange('date', date)}
                  value={selectedValues.date}
                />
                <Button
                  type="primary"
                  disabled={
                    !selectedValues.user ||
                    !selectedValues.workout ||
                    !selectedValues?.difficulty ||
                    !selectedValues.date
                  }
                  onClick={isEdit.workout ? updateWorkout : addWorkout}
                >
                  {isEdit.workout ? `Update Workout` : 'Add Workout'}
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
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                <Select
                  style={{ minWidth: 200 }}
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
                  style={{ minWidth: 150 }}
                  placeholder="type"
                  onChange={(value) => handleSelectChange('type', value)}
                  value={selectedValues.type}
                >
                  <Select.Option value="BREAKFAST">Breakfast</Select.Option>
                  <Select.Option value="LUNCH">Lunch</Select.Option>
                  <Select.Option value="DINNER">Dinner</Select.Option>
                  <Select.Option value="SNACKS">Snacks</Select.Option>
                </Select>
                <Input
                  style={{ width: 80 }}
                  placeholder="Quantity"
                  value={selectedValues.quantity.value || ''}
                  onChange={(e) =>
                    handleSelectChange('quantity', { ...selectedValues.quantity, value: e.target.value })
                  }
                />
                <Select
                  placeholder="Unit"
                  onChange={(value) => handleQuantityTypeChange(value)}
                  value={selectedValues.quantity.type}
                >
                  {quantityTypes.map((type) => (
                    <Select.Option key={type} value={type}>
                      {type}
                    </Select.Option>
                  ))}
                </Select>
                <DatePicker
                  style={{ minWidth: 130 }}
                  onChange={(date) => {
                    handleSelectChange('date', date);
                  }}
                  value={selectedValues.date}
                />
                {!isEdit.meal ? (
                  <Button type="primary" disabled={!selectedValues.user || !selectedValues.meal} onClick={addMeal}>
                    Add meal
                  </Button>
                ) : (
                  <Button type="primary" onClick={updateMeal}>
                    Update Meal
                  </Button>
                )}
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
            {selectedValues.user ? (
              <>
                <Box display="flex" justifyContent={'center'}>
                  <Avatar size={100} src={customerDetails?.image} />
                </Box>
                <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>{`${customerDetails?.full_name}`}</h2>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Text strong>Height:</Text>
                    <Text>{customerDetails?.height} cm</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Text strong>Weight:</Text>
                    <Text>{customerDetails?.current_weight} kg</Text>
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
          <Drawer
            title="DIET PROOF"
            placement="right"
            closable={false}
            onClose={() => setDrawerOpen(false)}
            open={DrawerOpen}
            getContainer={false}
          >
            <Image width={'100%'} height={'250px'} src={rowData?.mealCompletionImage} />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Rate disabled defaultValue={`${rowData.rating}`} />
            </div>
            <div>
              <TextArea rows={6} placeholder="" value={rowData?.comment} maxLength={6} />
            </div>
          </Drawer>
          {selectedType == 'Meal' ? (
            <HealthSnapshot
              title="Meal Update"
              date={filterDate.meal || null}
              filterResult={handleSetMealDate}
              handleConsumed={handleConsumed}
              list={userMealRecommendation?.map((item, index) => ({
                id: item._id,
                image: item.meal?.meal_image || '',
                mealCompletionImage: item.meal_image_proof,
                isConsumedmeal: item.user_picked,
                isSkipMeal: item.user_skip,
                Name: item.meal.name,
                comment: item.comment,
                rating: item.rating,
                Type: item.meal_period,
                date: item.date,
                quantity: `${item.quantity.value} ${item.quantity.type}`,
                section: 'meal',
              }))}
              handleEdit={handleEdit}
              isDisabled={!selectedValues.user}
              isEmpty={!selectedValues.user || !userMealRecommendation?.length}
            />
          ) : (
            <HealthSnapshot
              title="Workout Update"
              date={filterDate.workout || null}
              filterResult={handleSetWorkoutDate}
              list={userWorkoutRecommendation?.map((item, index) => ({
                id: item._id,
                image: item.workout_id?.image || '',
                Name: item.workout_id.name,
                Type: item.difficulty,
                date: item.date,
                section: 'workout',
              }))}
              handleEdit={handleEdit}
              isDisabled={!selectedValues.user}
              isEmpty={!selectedValues.user || !userWorkoutRecommendation?.length}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default MealAndWorkout;
