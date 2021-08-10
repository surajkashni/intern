import React, { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listUnverified, verifyUser } from '../actions/adminActions';

const ListUnverifiedScreen = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { unverified } = useSelector((state) => state.unverifiedList);
  const { success } = useSelector((state) => state.userVerify);
  useEffect(() => {
    if (user === null) {
      history.push('/login');
    } else {
      dispatch(listUnverified(user.token));
    }
  }, [user, history, dispatch, success]);

  const verifyHandler = (email) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(verifyUser(user.token, email));
    }
  };
  return (
    <Container>
      <h1 className="py-3 text-secondary text-center">All Unverified User</h1>
      {unverified && unverified.length > 0 ? (
        <Table responsive striped size="sm" variant="dark" bordered>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unverified &&
              unverified.map((unv, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img width="200px" src={unv.img[0}/> </td>
                  <td>{unv.name}</td>
                  <td>{unv.email}</td>
                  <td>{unv.mobile}</td>
                  <td>{unv.role}</td>
                  <td>{unv.createdAt.slice(0, 10)}</td>
                  <td className="text-center">
                    <Button
                      className="btn btn-success rounded"
                      size="sm"
                      onClick={() => verifyHandler(unv.email)}
                    >
                      Verify
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h3 className="text-center text-danger">
          No Unverified User available
        </h3>
      )}
    </Container>
  );
};

export default ListUnverifiedScreen;
