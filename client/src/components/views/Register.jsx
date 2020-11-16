import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { Formik } from 'formik';
import {
  SubmitButton,
  Input,
  ResetButton,
  FormikDebug,
  Form,
  FormItem,
} from 'formik-antd';
import { message, Button, Row, Col, Card } from 'antd';
import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister,
  attemptRegisterCustomer,
} from '../../store/thunks/auth';
import { Error } from '../shared';

function validateRequired(value) {
  return value ? undefined : 'Required';
}
export default function Register() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState('');
  const [email, setEmail] = useState('');
  const [registerStep, setRegisterStep] = useState('register'); // Use an enum with TS;

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
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
    company: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required('Required'),
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    company: Yup.string().required('Required'),
    password: Yup.string().min(8).required(),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const onSubmit = (values) => {
    delete values.confirm_password;
    console.log(values);
    
    dispatch(attemptRegisterCustomer(values))
      .then(() => {
        setEmail(values.email);
        setRegisterStep('resend');
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
  };

  const onResendEmail = () => {
    dispatch(attemptResendConfirmation(email))
      .then(() => setRegisterStep('reset'))
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
  };

  const onReset = () => {
    dispatch(attemptResetRegister(email)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  };

  function renderSwitch() {
    switch (registerStep) {
      case 'register':
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validate={(values) => {
              if (!values.firstname) {
                return { firstname: 'Required' };
              }
              if (!values.lastname) {
                return { lastname: 'Required' };
              }
              if (!values.email) {
                return { email: 'Required' };
              }
              if (!values.company) {
                return { company: 'Required' };
              }
              if (!values.password) {
                return { password: 'Required' };
              }
              if (!values.confirm_password) {
                return { confirm_password: 'Required' };
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
                <Card
                  title="Registration"
                  bordered={false}
                  style={{ width: '50vh' }}
                >
                  <Form {...layout}>
                    <FormItem
                      name="company"
                      label={<FormattedMessage id="company" />}
                      required
                      validate={validateRequired}
                    >
                      <Input name="company" placeholder="Company" />
                    </FormItem>
                    <FormItem
                      name="firstname"
                      label={<FormattedMessage id="firstname" />}
                      required
                      validate={validateRequired}
                    >
                      <Input name="firstname" placeholder="Firstname" />
                    </FormItem>
                    <FormItem
                      name="lastname"
                      label={<FormattedMessage id="lastname" />}
                      required
                      validate={validateRequired}
                    >
                      <Input name="lastname" placeholder="Lastname" />
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
                      name="confirm_password"
                      label="Repeat Password"
                      required
                      validate={validateRequired}
                    >
                      <Input.Password
                        name="confirm_password"
                        placeholder="Repeat Password"
                      />
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
      case 'resend':
        return (
          <div className="container">
            <p>A verification email has been sent.</p>
            <p>Check you'r mailbox :{email}.</p>
            <p>
              You have 12 hours to activate your account. It can take up to 15
              min to receive our email.
            </p>
            <button onClick={onResendEmail}>
              Did not receive the email? Click here to send again.
            </button>
            {serverError && <Error>{serverError}</Error>}
          </div>
        );

      case 'reset':
        return (
          <div className="container">
            <p>Still not received an email? </p>
            <p>Try to register again. You may have given the wrong email. </p>
            <p>
              If you want to be able to use the same username, reset the
              registration :
            </p>
            <button onClick={onReset}>
              Click here to reset the registration
            </button>
            {serverError && <Error>{serverError}</Error>}
          </div>
        );
      default:
        break;
    }
  }

  return isAuth ? <Redirect to="/home" /> : <>{renderSwitch()}</>;
}
