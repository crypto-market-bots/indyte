import React, { useState } from 'react';
import { Segmented, Space } from 'antd';
import ManageMealPage from './ManageMealPage';

const Templates = () => {
  const [selectedType, setSelectedType] = useState('Meal');

  const handleSegmentedChange = (selectedOption) => {
    setSelectedType(selectedOption);
    console.log('type ', selectedOption);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Segmented size="large" block options={['Meal', 'Exercise', 'Workout']} onChange={handleSegmentedChange} />
      <ManageMealPage type={selectedType} />
    </Space>
  );
};

export default Templates;
