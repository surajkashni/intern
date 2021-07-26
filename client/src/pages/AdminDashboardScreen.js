import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  listDonators,
  listRequesters,
  listUnverified,
} from '../actions/adminActions';

const AdminDashboardScreen = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { requesters } = useSelector((state) => state.requestersList);
  const { donators } = useSelector((state) => state.donatorsList);
  const { unverified } = useSelector((state) => state.unverifiedList);
  useEffect(() => {
    if (user === null) {
      history.push('/login');
    } else {
      dispatch(listDonators(user.token));
      dispatch(listRequesters(user.token));
      dispatch(listUnverified(user.token));
    }
  }, [user, history, dispatch]);

  return (
    <Container>
      <h1 className="my-3 py-3 text-center">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-lg p-0 mb-5 bg-body rounded card_hover">
            <img
              src="https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg"
              alt="admin"
              className="card-img-top"
              style={{ height: '37vh' }}
            />
            <div className="card-body">
              <h5 className="card-title text-center">Requests</h5>
              <p className="text-center text-info">
                Total requests : {requesters && requesters.length}
              </p>
              <Link to="/admin/requests" className="btn btn-primary btn-block">
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg p-0 mb-5 bg-body rounded card_hover">
            <img
              src="https://visualpharm.com/assets/527/Person-595b40b85ba036ed117da7ec.svg"
              alt="doctor"
              style={{ height: '37vh' }}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title text-center">Donations</h5>
              <p className="text-center text-danger">
                Total donations : {donators && donators.length}
              </p>
              <Link to="/admin/donations" className="btn btn-primary btn-block">
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg p-0 mb-5 bg-body rounded card_hover">
            <img
              src="https://visualpharm.com/assets/512/Unfriend%20Male-595b40b85ba036ed117dad08.svg"
              alt="patient"
              style={{ height: '37vh' }}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title text-center">Unverified</h5>
              <p className="text-center text-success">
                Total unverified : {unverified && unverified.length}
              </p>
              <Link
                to="/admin/unverified"
                className="btn btn-primary btn-block"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboardScreen;
