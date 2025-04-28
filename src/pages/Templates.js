import React, { useState, useEffect } from 'react';
import { Segmented, Space } from 'antd';
import ManageMealPage from './ManageMealPage';

const Templates = () => {
  const [selectedType, setSelectedType] = useState('Meal');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeFromUrl = urlParams.get('type');
    if (typeFromUrl && typeFromUrl !== selectedType) {
      setSelectedType(typeFromUrl);
    }
    console.log(selectedType); // Add this line for debugging
  }, [selectedType]);

  const handleSegmentedChange = (selectedOption) => {
    if (selectedType !== selectedOption) {
      setSelectedType(selectedOption);
      const url = new URL(window.location.href);
      url.searchParams.set('type', selectedOption);
      window.history.pushState({}, '', url);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Segmented
        size="large"
        value={selectedType}
        block
        options={['Meal', 'Exercise', 'Workout']}
        onChange={handleSegmentedChange}
      />
      <ManageMealPage type={selectedType} />
    </Space>
  );
};

export default Templates;
