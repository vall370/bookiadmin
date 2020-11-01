import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  SubmitButton,
  Input,
  ResetButton,
  FormikDebug,
  Form,
  FormItem,
} from 'formik-antd';
import {
  message, Button, Row, Col, Card,
} from 'antd';
import { Error } from '../shared';
import { attemptCustomerLogin, attemptLogin } from '../../store/thunks/auth';

function validateRequired(value) {
  return value ? undefined : 'required';
}

export default function Login() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
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
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(3).max(50).required('Required'),
    password: Yup.string().min(5).max(255).required('Required'),
  });

  const onSubmit = (values) => {

    dispatch(attemptCustomerLogin(values)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  };

  return isAuth ? (
    <Redirect to="/home" />
  ) : (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validate={(values) => {
          if (!values.email) {
            return { email: 'Required' };
          }
          if (!values.password) {
            return { password: 'Required' };
          }
          return {};
        }}
        render={() => (
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: '75vh' }}
          >
            <Card title="Login" bordered={false} style={{ width: 'auto' }}>
              <Form
                {...layout}
              >
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

                <Row style={{ marginTop: 60 }}>
                  <Col offset={8}>
                    <Button.Group>
                      <ResetButton>Reset</ResetButton>
                      <SubmitButton>Submit</SubmitButton>
                    </Button.Group>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Row>
        )}
      />
    );
}
