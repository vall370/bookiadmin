import React, { useState } from 'react';
import * as Yup from 'yup';
import washing_machine from '../../images/washing-machine.png';
import dryer from '../../images/dryer.png';
import sauna from '../../images/sauna1.png';

import {
  Input,
  Radio,
  FormikDebug,
  FormItem,
  ResetButton,
  SubmitButton,
  Form,
  Select,
  TimePicker,
   
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
  Tabs,
  Divider
} from 'antd';
import '../../index.css';
import 'antd/dist/antd.css';
import { HeartFilled } from '@ant-design/icons';
const { TreeNode } = $TreeSelect;
const { Title } = Typography;
const { TabPane } = Tabs;

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
function callback(key) {
  console.log(key);
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
    <>
    <div>
      <Title>Era rum</Title>
    </div>
    <Divider />
    <div>
      <Title>Lägg till rum eller maskiner</Title>
    </div>
    <Tabs defaultActiveKey="1" onChange={callback} centered>
    <TabPane tab="Tab 1" key="1">
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
              <div className="same-row">
              <Select
                name="type_of_room"
                style={{ width: "25vh" }}
                placeholder="Välj typ av maskin"
                mode="single"
                size="large"
              >
                 <Select.Option value={'washing_machine'}>
                   <img src={washing_machine} width="24px" /> <span style={{marginLeft: '24px'}}>Washing machine</span> 
                  </Select.Option>
                  <Select.Option value={'sauna'}> 
                  <img src={sauna} width="24px" /> <span style={{marginLeft: '24px'}}>Sauna</span></Select.Option>
                  <Select.Option value={'dryer'}> 
                  <img src={dryer} width="24px" /> <span style={{marginLeft: '24px'}}>Dryer</span></Select.Option>
              </Select>
              <Input name="name_for_machine" placeholder="Name For Machine" />

              </div>
              <div className="timepicker">
              <FormItem
                name="open_hours"
                label="Open hours"
                required
                validate={validateRequired}
              >
              <TimePicker size="large" name="from_time" placeholder="From" />
              <TimePicker size="large" name="to_time" placeholder="To" />
              </FormItem>
              </div>
              <Row style={{ marginTop: 60 }}>
                <Col offset={8}>
                  <Button.Group>
                    <ResetButton>Reset</ResetButton>
                    <SubmitButton>Submit</SubmitButton>
                  </Button.Group>
                </Col>
              </Row>
            </div>

          </div>
        </Form>
      )}
    />
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
  </>
  );
}
