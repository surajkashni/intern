import {
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAIL,
  DONATORS_FOR_REQUESTER_LIST_REQUEST,
  DONATORS_FOR_REQUESTER_LIST_SUCCESS,
  DONATORS_FOR_REQUESTER_LIST_FAIL,
} from '../constants/requestConstants';

import axios from 'axios';

export const createRequest =
  (authtoken, category, description) => async (dispatch) => {
    try {
      dispatch({
        type: REQUEST_CREATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authtoken,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/help`,
        { category, description },
        config
      );

      dispatch({
        type: REQUEST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REQUEST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listDonatorsForRequesters = (authtoken) => async (dispatch) => {
  try {
    dispatch({
      type: DONATORS_FOR_REQUESTER_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/donaterForReq`,
      config
    );

    dispatch({
      type: DONATORS_FOR_REQUESTER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONATORS_FOR_REQUESTER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
