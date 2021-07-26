import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listDonators } from '../actions/adminActions';

const ListDonationScreen = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { donators } = useSelector((state) => state.donatorsList);
  useEffect(() => {
    if (user === null) {
      history.push('/login');
    } else {
      dispatch(listDonators(user.token));
    }
  }, [user, history, dispatch]);
  return (
    <Container>
      <h1 className="py-3 text-secondary text-center">All Donations</h1>
      {donators && donators.length > 0 ? (
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
            {donators &&
              donators.map((donator, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{donator.category}</td>
                  <td>{donator.description}</td>
                  <td>{donator.createdAt.slice(0, 10)}</td>
                  <td>
                    Name: {donator.info.name},Address: {donator.info.address},
                    PIN: {donator.info.pin},Mobile: {donator.info.mobile},
                    Email: {donator.info.email}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h3 className="text-center text-danger">No donations available</h3>
      )}
    </Container>
  );
};

export default ListDonationScreen;
