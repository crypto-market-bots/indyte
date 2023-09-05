import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteExercise,
  deleteMeal,
  deleteWorkout,
  fetchAllExercises,
  fetchMeal,
  fetchWorkouts,
} from 'src/utils/apiCalls';
import { useEffect } from 'react';
import { Input, Select, Card, Row, Col, Typography, Button, Popconfirm, message, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const ManageMealPage = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const mealData = useSelector((state) => state.slice.data.meals);
  const exercisesData = useSelector((state) => state.slice.data.exercises);
  const workoutsData = useSelector((state) => state.slice.data.workouts);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    if (type == 'Meal' || !type) dispatch(fetchMeal());
    else if (type == 'Exercise') dispatch(fetchAllExercises());
    else if (type == 'Workout') dispatch(fetchWorkouts());
  }, [type]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const handleEditClick = (value) => {
    navigate(`/dashboard/templates/edit-item/${value}?type=${type}`);
  };
  console.log('type', type);

  const data = type === 'Meal' || !type ? mealData : type == 'Exercise' ? exercisesData : workoutsData;
  console.log('data', !type);

  const filteredData = data?.filter((item) => {
    return (
      item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchValue?.toLowerCase())
    );
  });

  if (sortBy === 'name') {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'type') {
    filteredData.sort((a, b) => a.type.localeCompare(b.type));
  }

  const confirm = async (id) => {
    if (type == 'Meal') {
      await dispatch(deleteMeal(id));
      dispatch(fetchMeal());
    } else if (type == 'Exercise') {
      await dispatch(deleteExercise(id));
      dispatch(fetchAllExercises());
    } else {
      await dispatch(deleteWorkout(id));
      dispatch(fetchWorkouts());
    }
  };
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Input
            placeholder="Search by name or description"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
            style={{ width: '300px', marginRight: '16px' }}
          />
          <Select
            showSearch
            placeholder="Sort by"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: 'name',
                label: 'Name',
              },
              {
                value: 'type',
                label: 'Type',
              },
              {
                value: 'date',
                label: 'Date',
              },
            ]}
          />
        </div>
        <Button type="primary" onClick={() => navigate(`add-item?type=${type}`)}>
          {' '}
          + Add {type}
        </Button>
      </div>
      <Row gutter={[16, 16]}>
        {!filteredData.length && 'No Meal Found'}
        {filteredData.map((item) => (
          <Col key={item._id} xs={24} sm={12} md={6} xxl={5} style={{ gap: 10 }}>
            <Card
              style={{ width: 250, marginRight: 2, boxShadow: '100px' }}
              cover={<img alt="example" src={item.image} style={{ height: '200px', objectFit: 'cover' }} />} // Set the image height and object-fit
              actions={[
                <Button onClick={() => handleEditClick(item._id)} key="edit">
                  Edit
                </Button>,
                <Popconfirm
                  title="Delete the task"
                  description={`Are you sure to delete this ${type}?`}
                  onConfirm={() => confirm(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  {contextHolder}

                  <Button danger type="primary">
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <div style={{ marginBottom: '10px' }}>
                <Typography.Text type="secondary">
                  {type == 'Workout'
                    ? ''
                    : new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }).format(new Date(item.created_time))}
                </Typography.Text>
              </div>
              <Meta
                title={item.name}
                // Use CSS to control the text overflow and show "..." for long descriptions
                description={
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.description}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ManageMealPage;
