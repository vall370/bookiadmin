import { push } from 'connected-react-router';
import { login, logout } from '../actions/user';

import {
  postRegister,
  postLogin,
  postLogout,
  getConfirmation,
  getCustomerConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword,
  postCustomerRegister,
  postCustomerLogin,
  postCustomerRegisterUser,
} from '../../api/index';

export const attemptLogin = (user) => async (dispatch) => {
  await postLogin(user)
    .then((res) => {
      dispatch(login(res.data.user));
      dispatch(push('/home'));
      return res.data;
    })
    .catch(dispatch(push('/login')));
};
export const attemptCustomerLogin = (user) => async (dispatch) => {
  await postCustomerLogin(user)
    .then((res) => {
      dispatch(login(res.data.user));
      dispatch(push('/home'));
      return res.data;
    })
    .catch(dispatch(push('/login')));
};
export const attemptSendResetPasswordLink = (email) => async (dispatch) => {
  await sendResetPasswordLink(email).catch(dispatch(push('/login/forgot')));
};

export const attemptResetPassword = (password, token) => async (dispatch) => {
  await resetPassword(password, token)
    .then(() => {
      dispatch(push('/login'));
    })
    .catch(dispatch(push(`/login/reset/${token}`)));
};

export const attemptLogout = () => async (dispatch) =>
  await postLogout()
    .then(() => {
      dispatch(logout());
      dispatch(push('/login'));
    })
    .catch(dispatch(push('/login')));

export const attemptRegister = (newUser) => async (dispatch) => {
  await postRegister(newUser).catch(dispatch(push('/register')));
};
export const attemptRegisterCustomer = (newCustomerUser) => async (
  dispatch,
) => {
  await postCustomerRegister(newCustomerUser).catch(
    dispatch(push('/register')),
  );
};
export const attemptRegisterCustomerUser = (newCustomerUser) => async (
  dispatch,
) => {
  await postCustomerRegisterUser(newCustomerUser).catch(
    dispatch(push('/users')),
  );
};
export const attemptGetConfirmation = (token) => async (dispatch) =>
  await getConfirmation(token).then(() => {
    dispatch(push('/login'));
  });
export const attemptGetCustomerConfirmation = (token) => async (dispatch) =>
  await getCustomerConfirmation(token).then(() => {
    dispatch(push('/login'));
  });

export const attemptResendConfirmation = (email) => async (dispatch) =>
  await resendConfirmation(email).catch(dispatch(push('/register')));

export const attemptResetRegister = (email) => async (dispatch) => {
  await resetRegister(email).catch(dispatch(push('/register')));
};
