import React from 'react';
import { Formik } from 'formik';
import {
  SubmitButton,
  Input,
  Checkbox,
  ResetButton,
  FormikDebug,
  Form,
  FormItem,
} from 'formik-antd';
import { message, Button, Row, Col } from 'antd';
function validateRequired(value) {
  return value ? undefined : 'required';
}
export default function AddUser() {
  const initialValues = {
    apartment: '',
    building: '',
    password: '',
  };
  return (
    <Row>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          message.info(JSON.stringify(values, null, 4));
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        validate={(values) => {
          if (!values.apartment) {
            return { apartment: 'Required' };
          }
          if (!values.building) {
            return { building: 'Required' };
          }
          if (!values.password) {
            return { password: 'Required' };
          }
          return {};
        }}
        render={() => (
          <Form layout={'inline'}>
            <FormItem
              name="apartment"
              label="Apartment"
              required={true}
              validate={validateRequired}
            >
              <Input name="apartment" placeholder="Apartment" />
            </FormItem>
            <FormItem
              name="building"
              label="Building"
              validate={validateRequired}
              required={true}
            >
              <Input name="building" placeholder="Building" />
            </FormItem>
            <FormItem
              name="password"
              label="Password"
              validate={validateRequired}
              required={true}
            >
              <Input name="password" placeholder="Password" />
            </FormItem>
            <Row>
              <Col span={8}>
                <Button.Group>
                  <Button onClick={DisableUserForm} type="ghost">
                    Cancel
                  </Button>

                  <ResetButton>Reset</ResetButton>
                  <SubmitButton>Submit</SubmitButton>
                </Button.Group>
              </Col>
            </Row>
          </Form>
        )}
      />
    </Row>
  );
}
