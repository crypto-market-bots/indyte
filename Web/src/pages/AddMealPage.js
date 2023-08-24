import React from 'react';
import { UploadOutlined } from '@mui/icons-material';
import { Form, Input, Button, Card, Typography, Row, Col, Progress, Upload, Radio, AutoComplete } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AddMealPage = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '1000px' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Title level={3}>Create a New Meal</Title>
          <Row justify={'space-between'}>
            <Col span={11}>
              {' '}
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}>
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="radio-button" label="Type" rules={[{ required: true, message: 'Please pick an item!' }]}>
                <Radio.Group>
                  <Radio.Button value="a">Meal</Radio.Button>
                  <Radio.Button value="b">Workout</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="upload" label="Image" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined fontSize={'3'} />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          {/* <Form.Item label="Nutritions -"> */}
          <Form.List name="nutritions">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key} gutter={16} align={'middle'}>
                    <Col span={10}>
                      <Form.Item label="Nutrition Name">
                        <AutoComplete
                          style={{
                            width: 200,
                          }}
                          options={options}
                          placeholder="search nutrition..."
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        label="Value"
                        name={[field.name, 'value']}
                        fieldKey={[field.fieldKey, 'value']}
                        rules={[{ required: true, message: 'Please enter a value' }]}
                      >
                        <Input type="number" placeholder="Nutrition value" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button onClick={() => remove(field.name)} style={{ marginTop: '5px' }}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button onClick={() => add()}>Add Nutrition</Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
          {/* </Form.Item> */}
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item label="YouTube Link 1" name="ytlink1">
            <Input placeholder="Enter YouTube Link 1" />
          </Form.Item>
          <Form.Item label="YouTube Link 2" name="ytlink2">
            <Input placeholder="Enter YouTube Link 2" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddMealPage;
