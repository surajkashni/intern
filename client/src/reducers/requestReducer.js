import {
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAIL,
  DONATORS_FOR_REQUESTER_LIST_REQUEST,
  DONATORS_FOR_REQUESTER_LIST_SUCCESS,
  DONATORS_FOR_REQUESTER_LIST_FAIL,
  DONATORS_FOR_REQUESTER_LIST_RESET,
} from '../constants/requestConstants';

export const requestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CREATE_REQUEST:
      return { loading: true };
    case REQUEST_CREATE_SUCCESS:
      return { loading: false, request: action.payload };
    case REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const donatorssForRequestersListReducer = (
  state = { donators: [] },
  action
) => {
  switch (action.type) {
    case DONATORS_FOR_REQUESTER_LIST_REQUEST:
      return { loading: true };
    case DONATORS_FOR_REQUESTER_LIST_SUCCESS:
      return { loading: false, donators: action.payload };
    case DONATORS_FOR_REQUESTER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DONATORS_FOR_REQUESTER_LIST_RESET:
      return { donators: [] };
    default:
      return state;
  }
};
