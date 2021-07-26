import {
  DONATION_CREATE_REQUEST,
  DONATION_CREATE_SUCCESS,
  DONATION_CREATE_FAIL,
  REQUESTERS__FOR_DONATORS_LIST_REQUEST,
  REQUESTERS__FOR_DONATORS_LIST_SUCCESS,
  REQUESTERS__FOR_DONATORS_LIST_FAIL,
} from '../constants/donationConstants';

import axios from 'axios';

export const createDonation =
  (authtoken, category, description) => async (dispatch) => {
    try {
      dispatch({
        type: DONATION_CREATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authtoken,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/donation`,
        { category, description },
        config
      );

      dispatch({
        type: DONATION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DONATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listRequestersForDonators = (authtoken) => async (dispatch) => {
  try {
    dispatch({
      type: REQUESTERS__FOR_DONATORS_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/requesterForDon`,
      config
    );

    dispatch({
      type: REQUESTERS__FOR_DONATORS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUESTERS__FOR_DONATORS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
