import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import {
  donationCreateReducer,
  requestersForDonatorsListReducer,
} from './donationReducer';
import {
  requestCreateReducer,
  donatorssForRequestersListReducer,
} from './requestReducer';
import {
  donatorsListReducer,
  requestersListReducer,
  unverifiedListReducer,
  userVerifyReducer,
} from './adminReducers';

const rootReducer = combineReducers({
  user: userReducer,
  donation: donationCreateReducer,
  request: requestCreateReducer,
  donatorsList: donatorsListReducer,
  requestersList: requestersListReducer,
  unverifiedList: unverifiedListReducer,
  userVerify: userVerifyReducer,
  requestersForDonators: requestersForDonatorsListReducer,
  donatorssForRequestersList: donatorssForRequestersListReducer,
});

export default rootReducer;
