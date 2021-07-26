import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listRequesters } from '../actions/adminActions';

const ListRequestScreen = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { requesters } = useSelector((state) => state.requestersList);
  useEffect(() => {
    if (user === null) {
      history.push('/login');
    } else {
      dispatch(listRequesters(user.token));
    }
  }, [user, history, dispatch]);
  return (
    <Container>
      <h1 className="py-3 text-secondary text-center">All Requests</h1>
      {requesters && requesters.length > 0 ? (
        <Table responsive striped size="sm" variant="dark" bordered>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {requesters &&
              requesters.map((requester, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{requester.category}</td>
                  <td>{requester.description}</td>
                  <td>{requester.createdAt.slice(0, 10)}</td>
                  <td>
                    Name: {requester.info.name},Address:{' '}
                    {requester.info.address}, PIN: {requester.info.pin},Mobile:{' '}
                    {requester.info.mobile}, Email: {requester.info.email}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h3 className="text-center text-danger">No requests available</h3>
      )}
    </Container>
  );
};

export default ListRequestScreen;
