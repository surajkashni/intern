import {
  DONATION_CREATE_REQUEST,
  DONATION_CREATE_SUCCESS,
  DONATION_CREATE_FAIL,
  REQUESTERS__FOR_DONATORS_LIST_REQUEST,
  REQUESTERS__FOR_DONATORS_LIST_SUCCESS,
  REQUESTERS__FOR_DONATORS_LIST_FAIL,
  REQUESTERS__FOR_DONATORS_LIST_RESET,
} from '../constants/donationConstants';

export const donationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_CREATE_REQUEST:
      return { loading: true };
    case DONATION_CREATE_SUCCESS:
      return { loading: false, donation: action.payload };
    case DONATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const requestersForDonatorsListReducer = (
  state = { requesters: [] },
  action
) => {
  switch (action.type) {
    case REQUESTERS__FOR_DONATORS_LIST_REQUEST:
      return { loading: true };
    case REQUESTERS__FOR_DONATORS_LIST_SUCCESS:
      return { loading: false, requesters: action.payload };
    case REQUESTERS__FOR_DONATORS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case REQUESTERS__FOR_DONATORS_LIST_RESET:
      return { requesters: [] };
    default:
      return state;
  }
};
