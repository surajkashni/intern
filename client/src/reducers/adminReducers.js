import {
  DONATORS_LIST_REQUEST,
  DONATORS_LIST_SUCCESS,
  DONATORS_LIST_FAIL,
  DONATORS_LIST_RESET,
  REQUESTERS_LIST_REQUEST,
  REQUESTERS_LIST_SUCCESS,
  REQUESTERS_LIST_FAIL,
  REQUESTERS_LIST_RESET,
  UNVERIFIED_LIST_REQUEST,
  UNVERIFIED_LIST_SUCCESS,
  UNVERIFIED_LIST_FAIL,
  UNVERIFIED_LIST_RESET,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
} from '../constants/adminConstants';

export const donatorsListReducer = (state = { donators: [] }, action) => {
  switch (action.type) {
    case DONATORS_LIST_REQUEST:
      return { loading: true };
    case DONATORS_LIST_SUCCESS:
      return { loading: false, donators: action.payload };
    case DONATORS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DONATORS_LIST_RESET:
      return { donators: [] };
    default:
      return state;
  }
};

export const requestersListReducer = (state = { requesters: [] }, action) => {
  switch (action.type) {
    case REQUESTERS_LIST_REQUEST:
      return { loading: true };
    case REQUESTERS_LIST_SUCCESS:
      return { loading: false, requesters: action.payload };
    case REQUESTERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case REQUESTERS_LIST_RESET:
      return { requesters: [] };
    default:
      return state;
  }
};

export const unverifiedListReducer = (state = { unverified: [] }, action) => {
  switch (action.type) {
    case UNVERIFIED_LIST_REQUEST:
      return { loading: true };
    case UNVERIFIED_LIST_SUCCESS:
      return { loading: false, unverified: action.payload };
    case UNVERIFIED_LIST_FAIL:
      return { loading: false, error: action.payload };
    case UNVERIFIED_LIST_RESET:
      return { unverified: [] };
    default:
      return state;
  }
};

export const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true };
    case USER_VERIFY_SUCCESS:
      return { loading: false, success: true };
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
