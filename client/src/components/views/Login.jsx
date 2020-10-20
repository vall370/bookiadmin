import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { attemptLogin } from "./../../store/thunks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "./../shared";
import { Formik } from "formik";
import {
  SubmitButton,
  Input,
  ResetButton,
  FormikDebug,
  Form,
  FormItem,
} from "formik-antd";
import { message, Button, Row, Col, Card } from "antd";

function validateRequired(value) {
  return value ? undefined : "required";
}

export default function Login() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState("");

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
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const onSubmit = (values) => {
    dispatch(attemptLogin(values)).catch((error) => {
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
      onSubmit={(values, actions) => {
        message.info(JSON.stringify(values, null, 4));
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validate={(values) => {
        if (!values.email) {
          return { email: "Required" };
        }
        if (!values.username) {
          return { username: "Required" };
        }
        if (!values.password) {
          return { password: "Required" };
        }
        return {};
      }}
      render={() => (
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "75vh" }}
        >
          <Card title="Login" bordered={false} style={{ width: "auto" }}>
            <Form
              {...layout}
              // style={{
              //   display: "flex",
              //   gridTemplateColumns: "1fr 1fr 1fr",
              // }}
              // labelCol={{ xs: 10 }}
              // // wrapperCol={{ xs: 20 }}
            >
              <FormItem
                name="email"
                label="Email"
                required={true}
                validate={validateRequired}
              >
                <Input name="email" placeholder="Email" />
              </FormItem>
              <FormItem
                name="password"
                label="Password"
                required={true}
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
