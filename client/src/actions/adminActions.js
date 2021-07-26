import {
  DONATORS_LIST_REQUEST,
  DONATORS_LIST_SUCCESS,
  DONATORS_LIST_FAIL,
  REQUESTERS_LIST_REQUEST,
  REQUESTERS_LIST_SUCCESS,
  REQUESTERS_LIST_FAIL,
  UNVERIFIED_LIST_REQUEST,
  UNVERIFIED_LIST_SUCCESS,
  UNVERIFIED_LIST_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
} from '../constants/adminConstants';
import axios from 'axios';
export const listDonators = (authtoken) => async (dispatch) => {
  try {
    dispatch({
      type: DONATORS_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/donationall`,
      config
    );

    dispatch({
      type: DONATORS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONATORS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRequesters = (authtoken) => async (dispatch) => {
  try {
    dispatch({
      type: REQUESTERS_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/requesterall`,
      config
    );

    dispatch({
      type: REQUESTERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUESTERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUnverified = (authtoken) => async (dispatch) => {
  try {
    dispatch({
      type: UNVERIFIED_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/unverified`,
      config
    );

    dispatch({
      type: UNVERIFIED_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNVERIFIED_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyUser = (authtoken, email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/verification`,
      { email },
      config
    );

    dispatch({
      type: USER_VERIFY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
