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
  Modal,
} from 'antd';
import { useState } from 'react';
import {
  EditExercise,
  EditWorkout,
  addEquipment,
  addExercise,
  addMeal,
  addWorkout,
  fetchAllEquipment,
  fetchAllExercises,
  fetchSingleExercise,
  fetchSingleWorkout,
  deleteEquipment,
  updateEquipment,
} from 'src/utils/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchSingleMealData, EditMeal } from 'src/utils/apiCalls';
import { IconButton, Stack } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import 'src/index.css';
import { object, string } from 'prop-types';
import { DeleteOutlined } from '@mui/icons-material';
import ArrowBack from '@mui/icons-material/ArrowBack';

const { Title } = Typography;

const AddMealPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || '';

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [addedEquipmentImage, setAddedEquipmentImage] = useState(null);
  const [addedEquipmentName, setAddedEquipmentName] = useState(null);

  const MealData = useSelector((state) => state.slice.data.singlemeal);
  const ExerciseData = useSelector((state) => state.slice.data.singleExercise);
  const WorkoutData = useSelector((state) => state.slice.data.singleWorkout);
  const AllExercises = useSelector((state) => state.slice.data.exercises);
  const isMealDataLoading = useSelector((state) => state.slice.loading.singlemeal);
  const isExerciseDataLoading = useSelector((state) => state.slice.loading.singleExercise);
  const isWorkoutDataLoading = useSelector((state) => state.slice.loading.singleWorkout);
  const isAddEquipmentLoading = useSelector((state) => state.slice.loading.addEquipment);
  const isUpdateEquipmentLoading = useSelector((state) => state.slice.loading.updateEquipment);
  const equipments = useSelector((state) => state.slice.data.equipments);
  console.log(WorkoutData);
  //update loadings
  const isEditMealLoading = useSelector((state) => state.slice.loading.editMeal);
  const isAddMealLoading = useSelector((state) => state.slice.loading.addMeal);

  const loading = isEditMealLoading || isAddMealLoading;

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
    // const workoutIndex = WorkoutData?.findIndex((workout) => workout._id === id);
    // console.log('WorkoutData', WorkoutData);

    initialFormValues =
      type === 'Meal'
        ? { ...MealData, type, image: MealData?.meal_image }
        : type === 'Exercise'
        ? { ...ExerciseData, type, image: ExerciseData?.exercise_image }
        : type === 'Workout'
        ? { ...WorkoutData, type, image: WorkoutData?.workout_image }
        : {};
  }

  const onFinish = (values) => {
    // For Add
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (
          key === 'nutritions' ||
          key === 'required_ingredients' ||
          key === 'steps' ||
          key === 'exercises' ||
          key === 'physical_equipments'
        ) {
          formData.append(key, JSON.stringify(values[key]));
        } else formData.append(key, values[key]);
      }
    }
    switch (type) {
      case 'Meal':
        formData.append('meal_image', selectedFile ? selectedFile : initialFormValues.image);
        if (!id) dispatch(addMeal(formData));
        else dispatch(EditMeal({ id, formData }));
        break;

      case 'Workout':
        formData.append('workout_image', selectedFile ? selectedFile : initialFormValues.image);
        if (!id) dispatch(addWorkout(formData));
        else dispatch(EditWorkout({ id, formData }));
        break;

      case 'Exercise':
        formData.append('exercise_image', selectedFile ? selectedFile : initialFormValues.image);
        if (!id) dispatch(addExercise(formData));
        else dispatch(EditExercise({ id, formData }));
        break;

      default:
        break;
    }
    handleGoBack();
  };

  useEffect(() => {
    if (!id) {
      if (type == 'Workout') {
        dispatch(fetchAllExercises());
        dispatch(fetchAllEquipment()).then((res) => {
          setEquipmentList(res.payload);
        });
      }
    } else if (id) {
      if (type === 'Meal') dispatch(fetchSingleMealData(id));
      else if (type === 'Exercise') dispatch(fetchSingleExercise(id));
      else if (type === 'Workout') {
        dispatch(fetchAllExercises());
        dispatch(fetchSingleWorkout(id));
        dispatch(fetchAllEquipment()).then((res) => {
          setEquipmentList(res.payload);
        });
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
    {
      value: 'calorie',
      label: 'Calorie',
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

  const openModal = (equipment) => {
    setSelectedEquipment(equipment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
    setModalVisible(false);
  };

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
                          {id && initialFormValues[index]?.image ? (
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
              {/* {type == 'Workout' && (
                <Button type="primary" style={{ marginTop: '5px', marginLeft: '5px' }} onClick={openModal}>
                  Manage Equipment
                </Button>
              )} */}
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
          src={exercise.exercise_image}
          alt={exercise.name}
          style={{ width: '30px', height: '30px', marginRight: '8px', borderRadius: '10%' }}
        />
        <Typography.Text>{exercise.name}</Typography.Text>
      </Stack>
    ),
    value: exercise._id,
  }));

  const equipmentOptions = equipments?.map((equipment) => ({
    label: (
      <Stack direction={'row'} alignItems={'center'}>
        <Image
          src={equipment.equipment_image}
          alt={equipment.equipment_name}
          style={{ width: '30px', height: '30px', marginRight: '8px', borderRadius: '10%' }}
        />
        <Typography.Text>{equipment.equipment_name}</Typography.Text>
      </Stack>
    ),
    value: equipment._id,
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
    console.log(e.target.files[0], 'file');
  };

  const [equipmentList, setEquipmentList] = useState(equipments);
  const [editedEquipment, setEditedEquipment] = useState(null);
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);

  const handleDoubleClick = (id) => {
    const updatedEquipmentList = equipmentList.map((equipment) =>
      equipment._id === id ? { ...equipment, isEditing: true } : { ...equipment, isEditing: false }
    );
    setEquipmentList(updatedEquipmentList);
    const selectedEquipment = equipmentList.find((equipment) => equipment._id === id);
    if (selectedEquipment) {
      setEditedEquipment(selectedEquipment);
    }
  };

  const handleSave = async () => {
    if (editedEquipment) {
      // Create a new FormData object
      const formData = new FormData();
      const id = editedEquipment._id;

      // Loop through the editedEquipment JSON object and append key-value pairs to formData
      for (const key in editedEquipment) {
        formData.append(key, editedEquipment[key]);
      }

      // Manually append 'type' with the value 'web'
      formData.append('type', 'web');

      await dispatch(updateEquipment({ id, formData }));
      await dispatch(fetchAllEquipment()).then((res) => {
        setEquipmentList(res.payload);
      });

      setEditedEquipment(null);
      setIsAddingEquipment(null);
    }
  };

  const handleCancel = async () => {
    if (editedEquipment) {
      await dispatch(fetchAllEquipment()).then((res) => {
        setEquipmentList(res.payload);
      });
      setEditedEquipment(null);
    }
    setIsAddingEquipment(null);
  };

  const handleImageInputChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedEquipmentList = equipmentList.map((equipment) =>
        equipment._id === id ? { ...equipment, equipment_image: file } : equipment
      );
      setEquipmentList(updatedEquipmentList);
      const selectedEquipment = updatedEquipmentList.find((equipment) => equipment._id === id);
      console.log('selectedEquipment', selectedEquipment);
      if (selectedEquipment) {
        setEditedEquipment(selectedEquipment);
      }
    }
  };

  const handleAddEquipmentSubmit = async () => {
    console.log('clicked');
    const formData = new FormData();
    formData.append('equipment_image', addedEquipmentImage);
    formData.append('equipment_name', addedEquipmentName);
    await dispatch(addEquipment(formData));
    await dispatch(fetchAllEquipment()).then((res) => {
      setEquipmentList(res.payload);
    });
    setAddedEquipmentImage(null);
    setAddedEquipmentName(null);
    setEditedEquipment(null);
    setIsAddingEquipment(false);
  };

  const handleDeleteEquipment = async (id) => {
    await dispatch(deleteEquipment(id));
    await dispatch(fetchAllEquipment()).then((res) => {
      setEquipmentList(res.payload);
    });
  };

  const handleGoBack = () => {
    navigate(`/dashboard/templates?type=${type}`);
  };

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Card style={{ width: '100%', maxWidth: '1000px' }}>
            <Button onClick={handleGoBack}>
              <ArrowBack />
            </Button>
            <Form layout="vertical" onFinish={onFinish} initialValues={initialFormValues}>
              <Title level={3}>{!id ? `Create a New ${type}` : `Update ${type}`}</Title>
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
                    <Image width={200} src={initialFormValues.image} alt="Image" style={{ borderRadius: '10px' }} />
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
                  <Row justify={'start'} align={'middle'} style={{ marginTop: 20 }}>
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
                  <Row>
                    <Col span={20}>
                      <Form.Item label="Physical Equipments" name="physical_equipments">
                        <Select
                          size="large"
                          mode="multiple"
                          allowClear
                          style={{ width: '100%' }}
                          placeholder="Please select"
                          options={equipmentOptions}
                          onChange={(e) => console.log(e)}
                          filterOption={(inputValue, option) =>
                            option.label.props.children[1].props.children
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                      <Button type="primary" style={{ marginTop: '5px', marginLeft: '5px' }} onClick={openModal}>
                        Manage Equipment
                      </Button>
                    </Col>
                  </Row>

                  {/* {generateFormList('physical_equipments', [], physicalEquipmentsFields)} */}
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
                <Button type="primary" loading={loading} htmlType="submit">
                  {!id ? 'Submit' : 'Save'}
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Modal
            title={'Manage Equipment'}
            open={modalVisible}
            onCancel={closeModal}
            style={{ overflowY: 'auto' }}
            footer={null}
            destroyOnClose
            height={'80%'}
          >
            <Space direction="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Input.Search placeholder="Search equipment" style={{ marginBottom: '10px' }} />

              {editedEquipment ? (
                <Space size={6}>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button loading={isUpdateEquipmentLoading} type="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Space>
              ) : isAddingEquipment ? (
                <Space size={6}>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button
                    type="primary"
                    loading={isAddEquipmentLoading}
                    disabled={!addedEquipmentImage || !addedEquipmentName}
                    onClick={handleAddEquipmentSubmit}
                  >
                    Add
                  </Button>
                </Space>
              ) : (
                <Button type="primary" onClick={() => setIsAddingEquipment(true)}>
                  + Add Equipment
                </Button>
              )}
            </Space>

            {isAddingEquipment ? ( // Conditionally render the input fields when adding equipment
              <div>
                <label htmlFor={`image-upload-new`} style={{ cursor: 'pointer' }}>
                  Upload Image:
                  <input
                    id={`image-upload-new`}
                    type="file"
                    required
                    accept="image/*"
                    style={{ marginBottom: '10px', marginLeft: '10px' }}
                    onChange={(e) => setAddedEquipmentImage(e.target.files[0])}
                  />
                </label>
                <Input required placeholder="Equipment Name" onChange={(e) => setAddedEquipmentName(e.target.value)} />
              </div>
            ) : (
              <Row gutter={[16, 16]}>
                {equipmentList?.map((equipment) => (
                  <Col span={8} key={equipment._id}>
                    <Card
                      cover={
                        <div style={{ position: 'relative' }}>
                          <label htmlFor={`image-upload-${equipment._id}`} style={{ cursor: 'pointer' }}>
                            <img
                              alt={`Equipment ${equipment._id}`}
                              height={'100px'}
                              width={'100%'}
                              src={
                                equipment._id === editedEquipment?._id &&
                                typeof editedEquipment?.equipment_image == 'object'
                                  ? URL.createObjectURL(editedEquipment?.equipment_image)
                                  : equipment.equipment_image
                              }
                            />
                            <input
                              id={`image-upload-${equipment._id}`}
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => handleImageInputChange(equipment._id, e)}
                            />

                            <IconButton
                              // onClick={() => handleDeleteEquipment(equipment._id)} // Add your delete equipment function here
                              onClick={() => handleDeleteEquipment(equipment._id)}
                              size="small"
                              style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'white',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              <DeleteOutlined />
                            </IconButton>
                          </label>
                        </div>
                      }
                      onDoubleClick={() => handleDoubleClick(equipment._id)}
                    >
                      {equipment._id === editedEquipment?._id ? (
                        <Card.Meta
                          title={
                            <Input
                              size="small"
                              placeholder="Equipment Name"
                              onPressEnter={handleSave}
                              value={editedEquipment?.equipment_name}
                              onChange={(e) =>
                                setEditedEquipment({ ...editedEquipment, equipment_name: e.target.value })
                              }
                            />
                          }
                        />
                      ) : (
                        <Card.Meta style={{ cursor: 'pointer' }} title={equipment.equipment_name} />
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default AddMealPage;
