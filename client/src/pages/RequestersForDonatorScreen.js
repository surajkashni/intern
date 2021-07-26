import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listRequestersForDonators } from '../actions/donationActions';

const RequestersForDonatorScreen = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { requesters } = useSelector((state) => state.requestersForDonators);
  useEffect(() => {
    if (user === null) {
      history.push('/login');
    } else {
      dispatch(listRequestersForDonators(user.token));
    }
  }, [user, history, dispatch]);
  return (
    <Container>
      <h1 className="text-seconadry text-center py-3">
        List of suitable requesters
      </h1>
      {requesters && requesters.length > 0 ? (
        <Table responsive striped size="sm" variant="dark" bordered>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>

              <th>Request Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {requesters &&
              requesters.map((requester, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{requester.name}</td>
                  <td>{requester.email}</td>
                  <td>{requester.mobile}</td>
                  <td>
                    {requester.address}, {requester.pin}
                  </td>

                  <td>
                    {requester.infoReq
                      ? requester.infoReq.category
                      : 'No request made yet'}
                  </td>
                  <td>
                    {requester.infoReq
                      ? requester.infoReq.description
                      : 'No request made yet'}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h3 className="text-center text-danger">
          No suitable requester available
        </h3>
      )}
    </Container>
  );
};

export default RequestersForDonatorScreen;
