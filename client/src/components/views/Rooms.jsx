import React, { useState } from 'react';
import * as Yup from 'yup';

import {
  Input,
  Radio,
  FormikDebug,
  FormItem,
  ResetButton,
  SubmitButton,
  Form,
} from 'formik-antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import {
  Button,
  TreeSelect as $TreeSelect,
  Typography,
  message,
  Row,
  Col,
} from 'antd';
import '../../index.css';
import 'antd/dist/antd.css';
import { HeartFilled } from '@ant-design/icons';
const { TreeNode } = $TreeSelect;
const { Title } = Typography;
const plainOptions = ['Apple', 'Pear', 'Orange'];
function validateRequired(value) {
  return value ? undefined : 'required';
}
const options = [
  { label: 'Washing machine', value: 'washing_machine' },
  { label: 'Sauna', value: 'sauna' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];
function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const initialValues = {
  email: '',
  password: '',
  city: 3,
  type_of_room: 'washing_machine',
};

const validationSchema = Yup.object({
  email: Yup.string().min(3).max(50).required('Required'),
  password: Yup.string().min(5).max(255).required('Required'),
});
export default function Rooms() {
  const [value1, setValue1] = useState('Apple');

  const onChange1 = (e) => {
    console.log('radio1 checked', e.target.value);
    setValue1(e.target.value);
  };
  return (
    <Formik
      initialValues={initialValues}
      // onSubmit={handleSubmit}
      validate={(values) => {
        if (!values.userName) {
          return { userName: 'required' };
        }
        return undefined;
      }}
      render={(formik) => (
        <Form {...layout}>
          <div className="container">
            <div className="component-container">
              <FormItem
                name="type_of_room"
                label="Type of Room"
                required
                validate={validateRequired}
              >
                <Radio.Group name="type_of_room" size="large">
                  <Radio.Button value={'washing_machine'}>
                    Washing machine
                  </Radio.Button>
                  <Radio.Button value={'sauna'}>Sauna</Radio.Button>
                </Radio.Group>
              </FormItem>
              <FormItem
                name="email"
                label="Email"
                required
                validate={validateRequired}
              >
                <Input name="email" placeholder="Email" />
              </FormItem>
              <FormItem
                name="password"
                label="Password"
                required
                validate={validateRequired}
              >
                <Input.Password name="password" placeholder="Password" />
              </FormItem>
              <FormItem
                name="city"
                label="city"
                required
                validate={validateRequired}
              >
                <Radio.Group name="city" size="large">
                  <Radio.Button value={1}>Hamburg</Radio.Button>
                  <Radio.Button value={2}>Amsterdam</Radio.Button>
                  <Radio.Button value={3}>London</Radio.Button>
                </Radio.Group>
              </FormItem>
              <Row style={{ marginTop: 60 }}>
                <Col offset={8}>
                  <Button.Group>
                    <ResetButton>Reset</ResetButton>
                    <SubmitButton>Submit</SubmitButton>
                  </Button.Group>
                </Col>
              </Row>
            </div>

            <FormikDebug style={{ marginLeft: '25vh', float: 'right' }} />
          </div>
        </Form>
      )}
    />
  );
}
