import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { attemptGetConfirmation, attemptGetCustomerConfirmation } from '../../store/thunks/auth';
import { Error } from '../shared';

export default function ConfirmPage() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const { token } = useParams();

  function doSubmit() {
    dispatch(attemptGetCustomerConfirmation(token)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  }

  return isAuth ? (
    <Redirect to="/home" />
  ) : (
    <div className="container">
      <p>Click here to confirm your email</p>
      <button onClick={doSubmit}>Confirmation</button>
      {serverError && <Error>{serverError}</Error>}
    </div>
  );
}
