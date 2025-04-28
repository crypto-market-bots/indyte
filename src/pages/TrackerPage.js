import styled from '@emotion/styled';
import { Grid, Button } from '@mui/material';
import { AutoComplete, Avatar, Col, Drawer, Image, Input, Rate, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWidgetSummary } from 'src/sections/@dashboard/app';
import CircularGraph from 'src/components/CircularGraph';

import { fetchCustomer, fetchHistory } from 'src/utils/apiCalls';

const AwesomeButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.8rem',
  borderRadius: 30,
  padding: '8px 24px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  '&:not(:last-child)': {
    marginRight: theme.spacing(2),
  },
}));

const TrackerPage = () => {
  const customers = useSelector((state) => state.slice.data.customers);

  const [selectedValues, setSelectedValues] = useState({
    user: null,
    date: null,
    type: 'meal',
  });

  const dispatch = useDispatch();

  const options = customers.map((customer, index) => {
    return {
      customerName: `${customer.full_name}`,
      image: customer.image,
      customerId: customer._id,
      height: customer.height,
      weight: customer.current_weight,
    };
  });

  useEffect(() => {
    dispatch(fetchCustomer());
  }, []);

  const [selectedCustomerName, setselectedCustomerName] = useState('');

  const handleSelect = async (value, option) => {
    if (option && option.customerId) {
      console.log('option', option);
      setselectedCustomerName(option.customerName);
      setSelectedValues({ ...selectedValues, user: option.customerId });
    }
  };

  return (
    <Fragment>
      <Row style={{ margin: '10px 0px', gap: '10px', display: 'flex' }}>
        <Col>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            style={{ width: '100%', minWidth: 350, maxWidth: 500, overflow: 'auto' }}
            value={selectedCustomerName}
            options={options?.map((option, index) => ({
              value: option.customerId,
              customerName: option.customerName,
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={option.image} style={{ marginRight: '10px' }} /> {option.customerName}{' '}
                  <div>
                    <b>&nbsp; w</b>
                    {`: ${option.weight}kg `}
                    <b>h</b>
                    {`: ${option.height}ft`}
                  </div>
                </div>
              ),
              customerId: option.customerId,
            }))}
            filterOption={(inputValue, option) =>
              option.customerName.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onChange={(value) => setselectedCustomerName(value)}
            onSelect={handleSelect}
            size="large"
          >
            <Input.Search
              // allowClear={{ clearIcon: <CloseSquareFilled /> }}
              // onChange={(e) => e.target.value == '' && setSelectedValues({ ...selectedValues, user: null })}
              enterButton
              size="large"
              placeholder="Search User..."
            />
          </AutoComplete>
        </Col>
        <Col>
          <Select
            placeholder="select type"
            size="large"
            defaultValue={'meal'}
            //   value={selectedValues.type}
            //   disabled={!selectedValues.user}
            //   onChange={(value) => {
            //     setSelectedValues({ ...selectedValues, type: value });
            //   }}
            // style={{ width: '100%' }}
          >
            <Select.Option value="meal">Meal</Select.Option>
            <Select.Option value="workout">Workout</Select.Option>
          </Select>
        </Col>
        {/* <Col span={5}>
    <DatePicker onChange={(date) => handleSelectChange('date', date)} value={selectedValues.date} />
  </Col> */}
      </Row>
      <Row style={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Col xs={12} sm={13} md={14} lg={16}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary
                title="Item Orders"
                total={1723315}
                color="warning"
                icon={'ant-design:windows-filled'}
              />
            </Grid>
          </Grid>

          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Col>
              <h3>Target</h3>
            </Col>
            <Col>
              <AwesomeButton variant="contained" color="primary">
                + Assign Target
              </AwesomeButton>
            </Col>
          </Row>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} style={{ height: '600px' }}>
              <CircularGraph Heading="Water" percentage={70} Target={270} Achieved={40} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} style={{ height: '600px' }}>
              <CircularGraph Heading="Water" percentage={70} Target={270} Achieved={40} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} style={{ height: '600px' }}>
              <CircularGraph Heading="Water" percentage={70} Target={270} Achieved={40} />
            </Grid>
          </Grid>
        </Col>
        <Col xs={11} sm={10} md={9} lg={7}>
          <Drawer
            title="DIET PROOF"
            placement="right"
            width={'100%'}
            closable={false}
            // onClose={onClose}
            open={true}
            getContainer={false}
          >
            <Image width={'100%'} height={'250px'} src="https://takethemameal.com/files_images_v2/stam.jpg" />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Rate disabled defaultValue={2.5} />
            </div>
            <div>
              <TextArea
                rows={6}
                placeholder=""
                value={
                  "Thank you for providing me with this nutritious meal plan! I'm committed to following it diligently. I'll make sure to document each meal with a photo to show my progress. Looking forward to a healthier me!"
                }
                maxLength={6}
              />
            </div>
          </Drawer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TrackerPage;
