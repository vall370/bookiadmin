import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Error } from '../shared';
import { attemptResetPassword } from '../../store/thunks/auth';

export default function LoginResetPassword() {
  const { isAuth } = useSelector((state) => state.user);
  const { token } = useParams();
  const [serverError, setServerError] = useState('');

  const dispatch = useDispatch();

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().min(5).max(255).required('Required'),
  });

  const onSubmit = (values) => {
    const { password } = values;
    dispatch(attemptResetPassword(password, token)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  };

  return isAuth ? (
    <Redirect to="/home" />
  ) : (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => (
        <div className="container">
          <Form className="form">
            <div className="field">
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component={Error} />
            </div>
            <button type="submit" disabled={!formik.dirty || !formik.isValid}>
              Reset password
            </button>
            {serverError && <Error>{serverError}</Error>}
          </Form>
        </div>
      )}
    </Formik>
  );
}
