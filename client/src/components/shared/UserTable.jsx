import React, { useEffect, useState } from 'react';
import {
  Table,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Card,
  message,
  Radio,
  Form,
  Input,
  Tag,
  Checkbox,
} from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { green } from '@ant-design/colors';
const success = () => {
  message.success('This is a success message');
};

const inactive = () => {
  message.error('This is an error message');
};

export default function UserTable(props) {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [changeStatus, setChangeStatus] = useState(props.status);
  const [status, setStatus] = useState(props.record.status);
  const [updateApartment, setUpdateApartment] = useState(true);
  const [updateBuilding, setUpdateBuilding] = useState(true);
  const [updateRFID, setUpdateRFID] = useState(true);
  const [updateEmail, setUpdateEmail] = useState(true);
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const record = props.record;
  function onChange(e) {
    setStatus(e.target.value);
    console.log(`radio checked:${e.target.value}`);
  }
  function handleUpdateApartment() {
    if (updateApartment === true) {
      setUpdateApartment(false);
    } else {
      setUpdateApartment(true);
    }
  }
  function handleUpdateBuilding() {
    if (updateBuilding === true) {
      setUpdateBuilding(false);
    } else {
      setUpdateBuilding(true);
    }
  }
  function handleUpdateRFID() {
    if (updateRFID === true) {
      setUpdateRFID(false);
    } else {
      setUpdateRFID(true);
    }
  }
  function handleUpdateEmail() {
    if (updateEmail === true) {
      setUpdateEmail(false);
    } else {
      setUpdateEmail(true);
    }
  }
  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <Form
        form={form}
        initialValues={{
          apartment: record.apartment,
          building: record.building,
          email: record.email,
          RFID_CARD: record.rfid_key,
          status: record.status,
          layout: formLayout,
          remember: true,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Row>
          <Col span={4}>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <Form.Item
                name="apartment"
                label="Lägenhet"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={updateApartment} />
              </Form.Item>
              <Button style={{ width: 'auto' }} onClick={handleUpdateApartment}>
                Lägg till / Ändra
              </Button>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <Form.Item
                label="Byggnad"
                name="building"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input name="building" disabled={updateBuilding} />
              </Form.Item>

              <Button style={{ width: 'auto' }} onClick={handleUpdateBuilding}>
                Lägg till / Ändra
              </Button>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <Form.Item
                name="RFID_CARD"
                label="RFID-kort id"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input name="RFID_CARD" disabled={updateRFID} />
              </Form.Item>

              <Button style={{ width: 'auto' }} onClick={handleUpdateRFID}>
                Lägg till / Ändra
              </Button>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <Form.Item
                name="email"
                label="Email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input name="email" disabled={updateEmail} />
              </Form.Item>
              <Button style={{ width: 'auto' }} onClick={handleUpdateEmail}>
                Lägg till / Ändra
              </Button>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <Form.Item
                name="name"
                label="Name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input name="name" disabled={updateEmail} />
              </Form.Item>
              <Button style={{ width: 'auto' }} onClick={handleUpdateEmail}>
                Lägg till / Ändra
              </Button>
            </div>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Status"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group onChange={onChange} defaultValue={status}>
                <Radio.Button
                  value="true"
                  style={{
                    color: 'green',
                    borderColor: 'green',
                    backgroundColor: status ? '#70C040' : null,
                  }}
                >
                  <CheckCircleOutlined style={{ marginRight: 8 }} />
                  Aktiv
                </Radio.Button>
                <Radio.Button
                  value="false"
                  style={{
                    backgroundColor: status ? 'null' : '#f5222d',
                    color: 'red',
                    borderColor: 'red',
                  }}
                >
                  <CloseCircleOutlined style={{ marginRight: 8 }} />
                  Inaktiv
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={4}>
            <div style={{ flex: 1, flexDirection: 'column' }}></div>
          </Col>
        </Row>
        <Col span={4}></Col>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button.Group>
            <Button type="primary">Submit</Button>
            <Button type="primary" danger>
              Ta bort användare
            </Button>
          </Button.Group>
        </Form.Item>
      </Form>
    </div>
  );
}
