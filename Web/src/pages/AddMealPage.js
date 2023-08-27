import React, { useEffect, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Upload,
  Radio,
  AutoComplete,
  Divider,
  Select,
  Image,
  Space,
} from 'antd';
import { useState } from 'react';
import {
  EditExercise,
  EditWorkout,
  addExercise,
  addMeal,
  addWorkout,
  fetchAllExercises,
  fetchSingleExercise,
  fetchSingleWorkout,
} from 'src/utils/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchSingleMealData, EditMeal } from 'src/utils/apiCalls';
import { Stack } from '@mui/material';

const { Title } = Typography;

const AddMealPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || '';

  const MealData = useSelector((state) => state.slice.data.singlemeal);
  const ExerciseData = useSelector((state) => state.slice.data.singleExercise);
  const WorkoutData = useSelector((state) => state.slice.data.singleWorkout);
  const AllExercises = useSelector((state) => state.slice.data.exercises);
  const isMealDataLoading = useSelector((state) => state.slice.loading.singlemeal);
  const isExerciseDataLoading = useSelector((state) => state.slice.loading.singleExercise);
  const isWorkoutDataLoading = useSelector((state) => state.slice.loading.singleWorkout);

  const isLoading =
    type == 'Meal'
      ? isMealDataLoading
      : type == 'Exercise'
      ? isExerciseDataLoading
      : type === 'Workout'
      ? isWorkoutDataLoading
      : false;

  let initialFormValues = { type };
  if (id) {
    const workoutIndex = WorkoutData.findIndex((workout) => workout._id === id);

    initialFormValues =
      type === 'Meal'
        ? { ...MealData, type }
        : type === 'Exercise'
        ? { ...ExerciseData, type }
        : type === 'Workout'
        ? { ...(WorkoutData[workoutIndex] || {}), type }
        : {};
  }

  const onFinish = (values) => {
    // For Add
    if (!id) {
      if (type === 'Meal') dispatch(addMeal(values));
      else if (type === 'Exercise') dispatch(addExercise(values));
      else if (type === 'Workout') dispatch(addWorkout(values));
    }
    // For Edit
    else {
      values = { ...values, type: type, image: selectedFile ? selectedFile : initialFormValues.image };

      if (type === 'Meal' && id) dispatch(EditMeal({ id, ...values }));
      else if (type === 'Exercise' && id) dispatch(EditExercise({ id, ...values }));
      else if (type === 'Workout' && id) dispatch(EditWorkout({ id, ...values }));
    }
  };

  useEffect(() => {
    if (!id) type == 'Workout' && dispatch(fetchAllExercises());
    else if (id) {
      if (type == 'Meal') dispatch(fetchSingleMealData(id));
      else if (type == 'Exercise') dispatch(fetchSingleExercise(id));
      else if (type == 'Workout') {
        dispatch(fetchAllExercises());
        dispatch(fetchSingleWorkout(id));
      }
    }
  }, []);

  const options = [
    {
      value: 'fat',
      label: 'Fat',
    },
    {
      value: 'carbohydrates',
      label: 'Carbohydrates',
    },
    {
      value: 'protein',
      label: 'Protein',
    },
  ];
  const difficulty_levels = [
    {
      value: 'Easy',
      label: 'Easy',
    },
    {
      value: 'Medium',
      label: 'Medium',
    },
    {
      value: 'Hard',
      label: 'Hard',
    },
  ];

  const generateFormList = (name, labelsAndRules, inputFields) => (
    <>
      <Divider orientation="left" plain>
        <Typography.Text strong>{name}</Typography.Text>
      </Divider>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <div>
            {fields.map((field, index) => (
              <Row key={field.key} gutter={16} align={'middle'}>
                {inputFields.map(({ label, nameKey, rules, placeholder, inputType, options }) => (
                  <Col span={7} key={nameKey}>
                    <Form.Item
                      label={label}
                      name={[field.name, nameKey]}
                      fieldKey={[field.fieldKey, nameKey]}
                      rules={rules}
                    >
                      {inputType === 'select' ? (
                        <Select placeholder={placeholder} options={options} />
                      ) : inputType === 'textarea' ? (
                        <Input.TextArea rows={2} placeholder={placeholder} />
                      ) : inputType === 'file' ? (
                        <>
                          {id && initialFormValues[name][index]?.image ? (
                            <Space>
                              <Image
                                width={60}
                                height={60}
                                src={initialFormValues[name][index].image}
                                alt="Image"
                                style={{ borderRadius: '10px' }}
                              />
                              <Form.Item name="image" style={{ marginTop: '10px' }}>
                                <label htmlFor="imageInput" name="image">
                                  <Button
                                    type="primary"
                                    ghost
                                    size="small"
                                    onClick={() => document.getElementById('imageInput').click()}
                                  >
                                    Change Image
                                  </Button>
                                </label>
                                <input
                                  id="imageInput"
                                  style={{ display: 'none' }}
                                  type="file"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </Form.Item>
                            </Space>
                          ) : (
                            <input
                              type="file"
                              name={`${name}[${index}].image`}
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, index)}
                            />
                          )}
                        </>
                      ) : (
                        <Input placeholder={placeholder} type={inputType} />
                      )}
                    </Form.Item>
                  </Col>
                ))}
                <Col span={2}>
                  <Button onClick={() => remove(field.name)} danger style={{ marginTop: '5px' }}>
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="primary" ghost onClick={() => add()}>
                {' '}
                + Add {name.replace(/_/g, ' ').toLowerCase()}
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    </>
  );

  const nutritionsFields = [
    {
      label: 'Nutrition Name',
      nameKey: 'type',
      rules: [{ required: true, message: 'Please enter a name' }],
      placeholder: 'Enter name',
      inputType: 'select',
      options: options,
    },
    {
      label: 'Value',
      nameKey: 'value',
      rules: [{ required: true, message: 'Please enter a value' }],
      placeholder: 'Nutrition value',
      inputType: 'number',
    },
  ];

  const requiredIngredientsFields = [
    {
      label: 'Ingredient Name',
      nameKey: 'name',
      rules: [{ required: true, message: 'Please enter an ingredient name' }],
      placeholder: 'Ingredient name',
      inputType: 'text',
    },
    {
      label: 'Type',
      nameKey: 'type',
      rules: [{ required: true, message: 'Please enter an ingredient type' }],
      placeholder: 'Ingredient type',
      inputType: 'text',
    },
    {
      label: 'Quantity',
      nameKey: 'quantity',
      rules: [{ required: true, message: 'Please enter a quantity' }],
      placeholder: 'Quantity',
      inputType: 'number',
    },
  ];

  const physicalEquipmentsFields = [
    {
      label: 'Equipment Name',
      nameKey: 'name',
      rules: [{ required: true, message: 'Please enter an equipment name' }],
      placeholder: 'Ingredient name',
      inputType: 'text',
    },
    {
      label: 'Image',
      nameKey: 'image',
      rules: [{ required: true, message: 'Please select an image' }],
      placeholder: 'image',
      inputType: 'file',
    },
  ];

  const exerciseOptions = AllExercises?.map((exercise) => ({
    label: (
      <Stack direction={'row'} alignItems={'center'}>
        <Image
          src={exercise.image}
          alt={exercise.name}
          style={{ width: '30px', height: '30px', marginRight: '8px', borderRadius: '10%' }}
        />
        <Typography.Text>{exercise.name}</Typography.Text>
      </Stack>
    ),
    value: exercise._id,
  }));

  const stepsFields = [
    {
      label: 'Step Title',
      nameKey: 'title',
      rules: [{ required: true, message: 'Please enter a step title' }],
      placeholder: 'Step title',
      inputType: 'text',
    },
    {
      label: 'Step Description',
      nameKey: 'description',
      rules: [{ required: true, message: 'Please enter a step description' }],
      placeholder: 'Step description',
      inputType: 'textarea',
    },
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Card style={{ width: '100%', maxWidth: '1000px' }}>
            <Form layout="vertical" onFinish={onFinish} initialValues={initialFormValues}>
              <Title level={3}>Create a New {type}</Title>
              <Row justify={'space-between'}>
                <Col span={11}>
                  <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}>
                    <Input name="name" placeholder="Enter name" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please pick an item!' }]}>
                    <Radio.Group>
                      <Radio.Button disabled={type !== 'Meal'} value="Meal">
                        Meal
                      </Radio.Button>
                      <Radio.Button disabled={type !== 'Exercise'} value="Exercise">
                        Exercise
                      </Radio.Button>
                      <Radio.Button disabled={type !== 'Workout'} value="Workout">
                        Workout
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              {initialFormValues.image && id ? (
                <Space size={12}>
                  {selectedFile ? (
                    <Image
                      width={200}
                      src={URL.createObjectURL(selectedFile)}
                      alt="Meal Image"
                      style={{ borderRadius: '10px' }}
                    />
                  ) : (
                    <Image
                      width={200}
                      src={initialFormValues.image}
                      alt="Meal Image"
                      style={{ borderRadius: '10px' }}
                    />
                  )}
                  <Form.Item name="image">
                    <label htmlFor="imageInput" name="image">
                      <Button type="primary" onClick={() => document.getElementById('imageInput').click()}>
                        Change Image
                      </Button>
                    </label>
                    <input
                      id="imageInput"
                      style={{ display: 'none' }}
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Form.Item>
                </Space>
              ) : (
                <Form.Item label="Image" name="image">
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </Form.Item>
              )}

              {(type === 'Meal' || type == '') && (
                <>
                  {generateFormList('nutritions', options, nutritionsFields)}
                  {generateFormList('required_ingredients', [], requiredIngredientsFields)}
                  {generateFormList('steps', [], stepsFields)}
                </>
              )}

              {type == 'Exercise' && (
                <>
                  <Row justify={'space-between'} style={{ marginTop: 20 }}>
                    <Form.Item label="Difficulty Level" name="difficulty_level">
                      <Select placeholder={'select difficulty level'} options={difficulty_levels} />
                    </Form.Item>
                    <Form.Item label="Repetition" name="repetition">
                      <Input type="number" placeholder="Enter Repetition" />
                    </Form.Item>
                    <Form.Item label="Time To Perform" name="timetoperform">
                      <Input placeholder="Enter Time (in minutes)" />
                    </Form.Item>
                    <Form.Item label="Calorie Burn" name="calorie_burn">
                      <Input type="number" placeholder="Enter calories" />
                    </Form.Item>
                  </Row>
                  {generateFormList('steps', [], stepsFields)}
                </>
              )}

              {type === 'Workout' && (
                <>
                  <Row justify={'start'} style={{ marginTop: 20 }}>
                    <Form.Item label="Calorie Burn" name="calorie_burn" style={{ marginRight: 20 }}>
                      <Input type="number" placeholder="Enter calories" />
                    </Form.Item>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Exercises" name="exercises">
                        <Select
                          size="large"
                          mode="multiple"
                          allowClear
                          style={{ width: '100%' }}
                          placeholder="Please select"
                          options={exerciseOptions}
                          onChange={(e) => console.log(e)}
                          filterOption={(inputValue, option) =>
                            option.label.props.children[1].props.children
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {generateFormList('physical_equipments', [], physicalEquipmentsFields)}
                </>
              )}

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} placeholder="Enter description" />
              </Form.Item>

              {type !== 'Workout' && (
                <Form.Item label="YouTube Link 1" name="ytlink1">
                  <Input placeholder="Enter YouTube Link 1" />
                </Form.Item>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {!id ? 'Submit' : 'Save'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddMealPage;
