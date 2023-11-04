import React, { useEffect, useRef, useState } from 'react';
import { Button, Carousel, Card as AntCard, Col, Form, Image, InputNumber, Row, Tabs } from 'antd';
import { Card, Stack, TextField } from '@mui/material';
import { Delete, UploadOutlined } from '@mui/icons-material';
import { Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  addImage,
  deleteImage,
  getActivityImages,
  getBannerImages,
  getGoalImages,
  getlifestyleImages,
  updateImage,
} from 'src/utils/apiCalls';
import { arrayOf } from 'prop-types';

const contentStyle = {
  width: '30vw',
  height: '15vw',
  // height: '15vh',
  backgroundSize: 'cover',
  borderRadius: '15px',
};

const style = {
  padding: '8px',
  background: '#f8f8f8',
  borderRadius: '5px',
};
const ImageGallery = () => {
  const dispatch = useDispatch();
  const activityImages = useSelector((state) => state.slice.data.activityImages);
  const goalImages = useSelector((state) => state.slice.data.goalImages);
  const lifestyleImages = useSelector((state) => state.slice.data.lifestyleImages);
  const bannerImages = useSelector((state) => state.slice.data.bannerImages);
  const banners = [
    { src: 'https://i.ytimg.com/vi/vz2zGfaq1ec/maxresdefault.jpg', alt: 'Banner 1' },
    {
      src: 'https://graphicsfamily.com/wp-content/uploads/edd/2023/05/Website-Food-Banner-Design-1180x664.jpg',
      alt: 'Banner 2',
    },
    {
      src: 'https://cdn.vectorstock.com/i/preview-1x/34/71/japanese-food-background-banner-vector-38853471.jpg',
      alt: 'Banner 3',
    },
  ];

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  const items = [
    {
      key: 'add',
      label: 'Add Banner',
    },
    {
      key: 'edit',
      label: 'Edit Banner',
    },
    {
      key: 'delete',
      label: 'Delete Banner',
    },
  ];
  const fileInputRef = useRef(null);
  const EditBannerInput = useRef(null);

  const { Dragger } = Upload;

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default drag-and-drop behavior
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('Dropped file:', file);
    }
  };
  const [bannerImage, setBannerImage] = useState('');
  const [segmentType, setSegmentType] = useState('add');

  const categories = [
    { title: 'Physical Activity', value: activityImages, key: 'physicalActivities' },
    { title: 'Goals', value: goalImages, key: 'goal' },
    { title: 'LifeStyles', value: lifestyleImages, key: 'lifestyle' },
  ];

  const [images, setImages] = useState({
    physicalActivities: '',
    goal: '',
    lifestyle: '',
  });
  const [title, setTitle] = useState({
    physicalActivities: '',
    goal: '',
    lifestyle: '',
  });
  const [edited, setEdited] = useState({});

  useEffect(() => {
    const actions = [getlifestyleImages, getActivityImages, getGoalImages, getBannerImages];
    actions.forEach((action) => dispatch(action()));
  }, []);

  const handleFileUpload = (e, key) => {
    const file = e.target.files[0];
    setImages({ ...images, [key]: file });
  };

  const actionFilter = (key) => {
    switch (key) {
      case 'physicalActivities':
        return getActivityImages;
      case 'lifestyle':
        return getlifestyleImages;
      case 'goal':
        return getGoalImages;
      default:
        break;
    }
  };

  const handleAdd = async (key) => {
    const formData = new FormData();
    formData.append('type', key);
    formData.append('name', title[key]);
    formData.append('image', images[key]);
    await dispatch(addImage(formData));

    const action = actionFilter(key);

    await dispatch(action());
    setImages({ ...images, [key]: '' });
    setTitle({ ...title, [key]: '' });
  };

  const handleEdit = async (id, key) => {
    console.log('id', id);
    const formData = new FormData();
    formData.append('type', key);
    formData.append('name', edited[id].title);
    formData.append('image', edited[id].image);
    await dispatch(updateImage({ id, payload: formData }));
    const action = actionFilter(key);

    await dispatch(action());
    setEdited({});
    setIsEditable(false);
  };

  const handleDelete = async (id, key) => {
    await dispatch(deleteImage(id));
    const action = actionFilter(key);
    await dispatch(action());
  };

  const [isEditable, setIsEditable] = useState({});

  const handleAddBanner = async () => {
    const formData = new FormData();
    formData.append('type', 'banner');
    formData.append('name', 'banner-image');
    formData.append('image', bannerImage);
    await dispatch(addImage(formData));
    await dispatch(getBannerImages());
    setBannerImage('');
  };

  const [editBanner, seteditBanner] = useState({
    position: 1,
    bannerImage: '',
  });
  const [deleteBannerPosition, setDeleteBannerPosition] = useState(1);

  const handleEditBanner = async () => {
    const formData = new FormData();
    formData.append('type', 'banner');
    formData.append('name', 'banner-image');
    formData.append('image', editBanner.bannerImage);
    const id = bannerImages[editBanner.position - 1]._id;
    await dispatch(updateImage({ id, payload: formData }));
    await dispatch(getBannerImages());
    seteditBanner({ position: 1, bannerImage: '' });
  };

  const handleDeleteBanner = async () => {
    const id = bannerImages[deleteBannerPosition - 1]._id;
    await dispatch(deleteImage(id));
    await dispatch(getBannerImages());
  };

  return (
    <>
      <h3>Auto Slide Banners</h3>
      <div style={{ margin: 10 }}>
        <Card elevation={3} style={{ padding: 15, width: '100%', display: 'flex', gap: 30 }}>
          <Carousel autoplay afterChange={onChange} style={contentStyle}>
            {bannerImages?.map((banner, index) => (
              <div key={index} style={contentStyle}>
                <img src={banner.image} alt={banner.alt} style={contentStyle} />
              </div>
            ))}
          </Carousel>
          <div style={{ display: 'flex' }}>
            <Tabs tabPosition={'left'} items={items} onChange={(e) => setSegmentType(e)} />
            {segmentType == 'add' ? (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                {bannerImage ? (
                  <div>
                    <Image
                      src={URL.createObjectURL(bannerImage)}
                      style={{ width: '20vw', height: '10vw', borderRadius: '10px' }}
                    />

                    <div style={{ gap: 10, display: 'flex', justifyContent: 'end  ' }}>
                      <Button onClick={() => setBannerImage('')}>Cancel</Button>
                      <Button type="primary" onClick={() => handleAddBanner()}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="custom-dragger"
                    style={{
                      margin: '10px',
                      padding: 30,
                      width: '20vw',
                      height: '10vw',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={((e) => e.preventDefault, () => fileInputRef.current.click())}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => setBannerImage(e.target.files[0])}
                      accept="image/*" // Specify accepted file types, if needed
                    />
                    <p className="ant-upload-text" style={{ display: 'flex', justifyContent: 'center' }}>
                      upload file <UploadOutlined />
                    </p>
                  </div>
                )}
              </div>
            ) : segmentType === 'edit' ? (
              <div style={{ marginTop: '10px' }}>
                <Form.Item required label="Banner number" name="layout">
                  <InputNumber
                    min={1}
                    max={bannerImages.length}
                    value={editBanner.position}
                    onChange={(e) => seteditBanner({ ...editBanner, position: e })}
                    defaultValue={1}
                  />
                </Form.Item>
                {!editBanner.bannerImage ? (
                  <div
                    className="custom-dragger"
                    style={{
                      margin: '10px',
                      padding: 30,
                      width: '20vw',
                      height: '10vw',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={((e) => e.preventDefault, () => EditBannerInput.current.click())}
                  >
                    <input
                      type="file"
                      ref={EditBannerInput}
                      style={{ display: 'none' }}
                      onChange={(e) => seteditBanner({ ...editBanner, bannerImage: e.target.files[0] })}
                      accept="image/*" // Specify accepted file types, if needed
                    />
                    <p className="ant-upload-text" style={{ display: 'flex', justifyContent: 'center' }}>
                      Upload file <UploadOutlined />
                    </p>
                  </div>
                ) : (
                  <div>
                    <Image
                      src={URL.createObjectURL(editBanner.bannerImage)}
                      style={{ width: '20vw', height: '10vw', borderRadius: '10px' }}
                    />
                    {editBanner.position && (
                      <div style={{ gap: 10, display: 'flex', justifyContent: 'end  ' }}>
                        <Button onClick={() => seteditBanner({ position: '1', bannerImage: '' })}>Cancel</Button>
                        <Button type="primary" onClick={() => handleEditBanner()}>
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Form.Item required label="Banner number" name="layout">
                  <InputNumber
                    min={1}
                    max={bannerImages.length}
                    value={deleteBannerPosition}
                    onChange={(e) => setDeleteBannerPosition(e)}
                    defaultValue={1}
                  />
                </Form.Item>
                <Button onClick={handleDeleteBanner}>Delete</Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h3>{category.title}</h3>
          <Card style={{ padding: '20px', margin: 10 }}>
            <Row gutter={[16, 16]} style={{ display: 'flex', alignItems: 'center' }}>
              {category?.value?.map((activity, index) => (
                <Col xs={8} sm={6} lg={6} xxl={3} style={style} key={index}>
                  <AntCard
                    style={{ padding: '0px' }}
                    title={
                      isEditable[activity?._id] ? (
                        <TextField
                          placeholder="Enter Title"
                          value={(edited[activity?._id] && edited[activity?._id]['title']) || ''}
                          onChange={(e) =>
                            setEdited({
                              ...edited,
                              [activity?._id]: { ...edited[activity?._id], title: e.target.value },
                            })
                          }
                          size="small"
                        />
                      ) : (
                        activity.name
                      )
                    }
                    bordered={true}
                    type="inner"
                  >
                    {isEditable[activity?._id] ? (
                      edited[activity?._id] && edited[activity?._id]['image'] ? (
                        <Image
                          src={URL.createObjectURL(edited[activity?._id] && edited[activity?._id]['image']) || ''}
                          style={{ borderRadius: '5px', aspectRatio: 1 / 1 }}
                          alt={`edited image`}
                        />
                      ) : (
                        <label>
                          <div
                            style={{
                              aspectRatio: 1 / 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '10px',
                            }}
                            className="custom-dragger"
                          >
                            <input
                              type="file"
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                setEdited({
                                  ...edited,
                                  [activity?._id]: { ...edited[activity?._id], image: e.target.files[0] },
                                })
                              }
                              accept="image/*"
                            />
                            upload file
                          </div>
                        </label>
                      )
                    ) : (
                      <Image
                        src={activity?.image}
                        style={{ borderRadius: '5px', aspectRatio: 1 / 1 }}
                        alt={`Activity ${index}`}
                      />
                    )}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3px',
                      }}
                    >
                      {isEditable[activity?._id] ? (
                        <>
                          <Button onClick={() => setIsEditable({ ...isEditable, [activity?._id]: false })}>
                            Cancel
                          </Button>
                          <Button onClick={() => handleEdit(activity?._id, category?.key)} type="primary">
                            Save
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => setIsEditable({ ...isEditable, [activity?._id]: true })}>Edit</Button>
                          <Button onClick={() => handleDelete(activity?._id, category.key)} danger>
                            <Delete />
                          </Button>
                        </>
                      )}
                    </div>
                  </AntCard>
                </Col>
              ))}
              <Col xs={8} sm={6} lg={4} xxl={3} style={{ padding: '0px', marginLeft: '10px' }}>
                <AntCard
                  title={
                    <TextField
                      placeholder="Enter Title"
                      value={title[category.key]}
                      onChange={(e) => setTitle({ ...title, [category.key]: e.target.value })}
                      size="small"
                    />
                  }
                  bordered={true}
                  type="inner"
                >
                  {images[category.key] ? (
                    <Image
                      style={{ borderRadius: '5px', aspectRatio: 1 / 1 }}
                      src={URL.createObjectURL(images[category.key])}
                    />
                  ) : (
                    <label>
                      <div
                        style={{ aspectRatio: 1 / 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        className="custom-dragger"
                      >
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileUpload(e, category.key)}
                          accept="image/*"
                        />
                        upload file
                      </div>
                    </label>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      marginTop: '20px',
                    }}
                  >
                    <Button
                      disabled={images[category.key] && title[category.key] ? false : true}
                      onClick={() => setImages({ ...images, [category.key]: '' })}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={images[category.key] && title[category.key] ? false : true}
                      type="primary"
                      onClick={() => handleAdd(category.key)}
                    >
                      Add +
                    </Button>
                  </div>
                </AntCard>
              </Col>
            </Row>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ImageGallery;
