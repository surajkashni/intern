import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listDonatorsForRequesters } from '../actions/requestActions';

const DonatorsForRequesterScreen = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { donators } = useSelector((state) => state.donatorssForRequestersList);
  useEffect(() => {
    if (user === null) {
      history.push('/login');
    } else {
      dispatch(listDonatorsForRequesters(user.token));
    }
  }, [user, history, dispatch]);
  return (
    <Container>
      <h1 className="py-3 text-secondary text-center">Suitable donators</h1>
      {donators && donators.length > 0 ? (
        <Table responsive striped size="sm" variant="dark" bordered>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>

              <th>Donation Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {donators &&
              donators.map((donator, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{donator.name}</td>
                  <td>{donator.email}</td>
                  <td>{donator.mobile}</td>
                  <td>
                    {donator.address}, {donator.pin}
                  </td>

                  <td>
                    {donator.infoDon
                      ? donator.infoDon.category
                      : 'No donation request yet'}
                  </td>
                  <td>
                    {donator.infoDon
                      ? donator.infoDon.description
                      : 'No donation request yet'}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h3 className="text-center text-danger">No requesters available</h3>
      )}
    </Container>
  );
};

export default DonatorsForRequesterScreen;
