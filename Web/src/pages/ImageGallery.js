import React, { useEffect, useRef, useState } from 'react';
import { Button, Carousel, Card as AntCard, Col, Form, Image, InputNumber, Row, Tabs } from 'antd';
import { Card, Stack, TextField } from '@mui/material';
import { UploadOutlined } from '@mui/icons-material';
import { Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityImages, getGoalImages, getlifestyleImages } from 'src/utils/apiCalls';

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
  //   border: '1px solid #ccc',
  borderRadius: '5px',
};
const ImageGallery = () => {
  const dispatch = useDispatch();
  const activityImages = useSelector((state) => state.slice.data.activityImages);
  const goalImages = useSelector((state) => state.slice.data.goalImages);
  const lifestyleImages = useSelector((state) => state.slice.data.lifestyleImages);
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
  ];
  const fileInputRef = useRef(null);

  const { Dragger } = Upload;

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default drag-and-drop behavior
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('Dropped file:', file);
      // Do further processing with the file here
    }
  };
  const [bannerImage, setBannerImage] = useState('');
  const [segmentType, setSegmentType] = useState('add');

  const categories = [
    { title: 'Physical Activity', value: activityImages, key: 'activity' },
    { title: 'Goals', value: goalImages, key: 'goal' },
    { title: 'LifeStyles', value: lifestyleImages, key: 'lifestyle' },
  ];

  const [images, setImages] = useState({
    activity: '',
    goal: '',
    lifestyle: '',
  });

  useEffect(() => {
    const actions = [getlifestyleImages, getActivityImages, getGoalImages];
    actions.forEach((action) => dispatch(action()));
  }, []);

  const handleFileUpload = (e, key) => {
    const file = e.target.files[0];
    setImages({ ...images, [key]: file });
    console.log('key', key, 'file', file);
  };

  const handleSave = () => {
    console.log();
  };

  return (
    <>
      <h3>Auto Slide Banners</h3>
      <div style={{ margin: 10 }}>
        <Card elevation={3} style={{ padding: 15, width: '100%', display: 'flex', gap: 30 }}>
          <Carousel autoplay afterChange={onChange} style={contentStyle}>
            {banners.map((banner, index) => (
              <div key={index} style={contentStyle}>
                <img src={banner.src} alt={banner.alt} style={contentStyle} />
              </div>
            ))}
          </Carousel>
          <div style={{ display: 'flex' }}>
            <Tabs tabPosition={'left'} items={items} onChange={(e) => setSegmentType(e)} />
            {segmentType == 'add' ? (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                {bannerImage ? (
                  <div>
                    {/* <div> */}
                    <Image
                      src={URL.createObjectURL(bannerImage)}
                      style={{ width: '100%', height: '50%', borderRadius: '10px' }}
                    />
                    {/* </div> */}
                    <div style={{ gap: 10, display: 'flex', justifyContent: 'end  ' }}>
                      <Button onClick={() => setBannerImage('')}>Cancel</Button>
                      <Button type="primary" onClick={handleSave}>
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
            ) : (
              <div style={{ marginTop: '10px' }}>
                <Form.Item required label="Banner number" name="layout">
                  <InputNumber min={1} onChange={onChange} defaultValue={1} />
                </Form.Item>
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
                    Click here to upload file <UploadOutlined />
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <Stack direction={'row'} alignItems={'center'} display={'flex'} justifyContent={'space-between'}>
            <h3>{category.title}</h3>
            {images[category.key] && (
              <div>
                <Button onClick={() => setImages({ ...images, [category.key]: '' })}>Cancel</Button>
                <Button type="primary" style={{ marginLeft: '20px' }}>
                  Save
                </Button>
              </div>
            )}
          </Stack>
          <Card style={{ padding: '20px', margin: 10 }}>
            <Row gutter={[16, 16]}>
              {category?.value?.map((activity, index) => (
                <Col xs={8} sm={6} lg={4} xxl={3} style={style} key={index}>
                  <AntCard title={activity.name} bordered={true} type="inner">
                    <Image
                      src={activity.image}
                      style={{ borderRadius: '5px', aspectRatio: 1 / 1 }}
                      alt={`Activity ${index}`}
                    />
                  </AntCard>
                </Col>
              ))}
              <Col xs={8} sm={6} lg={4} xxl={3} style={{ padding: '8px' }}>
                <AntCard title={<TextField placeholder="Enter Title" size="small" />} bordered={false} type="inner">
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
