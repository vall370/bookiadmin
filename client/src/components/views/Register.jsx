import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { Error } from "./../shared";
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister,
} from "../../store/thunks/auth";
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
export default function Register() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState("");
  const [email, setEmail] = useState("");
  const [registerStep, setRegisterStep] = useState("register"); // Use an enum with TS;

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
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const onSubmit = (values) => {
    dispatch(attemptRegister(values))
      .then(() => {
        setEmail(values.email);
        setRegisterStep("resend");
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
  };

  const onResendEmail = () => {
    dispatch(attemptResendConfirmation(email))
      .then(() => setRegisterStep("reset"))
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
      case "register":
        return (
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
                <Card
                  title="Registration"
                  bordered={false}
                  style={{ width: "auto" }}
                >
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
      case "resend":
        return (
          <div className="container">
            <p>A verification email has been sent.</p>
            <p>Check you mailbox : {email}.</p>
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

      case "reset":
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

  return isAuth ? (
    <Redirect to="/home" />
  ) : (
    <Fragment>{renderSwitch()}</Fragment>
  );
}
