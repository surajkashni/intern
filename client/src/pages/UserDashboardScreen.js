import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createDonation } from '../actions/donationActions';
import { createRequest } from '../actions/requestActions';
import { useHistory } from 'react-router-dom';

const UserDashboardScreen = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [category, setCategory] = useState('blood');
  const [description, setDescription] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  const user = useSelector((state) => state.user);

  const { donation } = useSelector((state) => state.donation);
  const { request } = useSelector((state) => state.request);

  useEffect(() => {
    if (user == null) {
      history.push('/login');
    }
  }, [user, history, donation]);

  const submitDonation = () => {
    dispatch(createDonation(user.token, category, description));
    setShow(false);
    // console.log(user.token, category, description);
  };
  const submitRequest = () => {
    dispatch(createRequest(user.token, category, description));
    setShow(false);
    // console.log(user.token, category, description);
  };

  return (
    <Container>
      <h1 className="text-secondary text-center py-3 mb-5">
        {user.name}'s Profile
      </h1>
      <Row>
        <Col md={9}>
          <Card className="shadow-lg p-5 mb-5 bg-white rounded">
            <Row>
              <Col sm={4}>
                <img
                  src="https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg"
                  alt="user"
                />
                <div className="d-flex justify-content-center mt-3 ">
                  {
                    (user.verified = true ? (
                      <span className="badge badge-pill badge-success my-2">
                        Verified
                      </span>
                    ) : (
                      <span className="badge badge-pill badge-danger my-2">
                        Not Verified
                      </span>
                    ))
                  }
                  {user.status === 'active' ? (
                    <span className="badge badge-pill badge-info my-2 ml-2">
                      Active
                    </span>
                  ) : (
                    <span className="badge badge-pill badge-secondary my-2 ml-2">
                      Inactive
                    </span>
                  )}
                </div>
              </Col>
              <Col sm={8}>
                <p className="text-secondary my-2 py-1">
                  <Row>
                    <Col sm="6">
                      <i className="fas fa-signature"></i> Name
                    </Col>
                    <Col sm="6">{user.name}</Col>
                  </Row>
                </p>
                <p className="text-secondary my-2 py-1">
                  <Row>
                    <Col sm="6">
                      <i className="fas fa-at"></i> Email
                    </Col>
                    <Col sm="6">{user.email}</Col>
                  </Row>
                </p>
                <p className="text-secondary my-2 py-1">
                  <Row>
                    <Col sm="6">
                      <i className="fas fa-mobile-alt"></i> Contact
                    </Col>
                    <Col sm="6">{user.mobile}</Col>
                  </Row>
                </p>
                <p className="text-secondary my-2 py-1">
                  <Row>
                    <Col sm="6">
                      <i className="far fa-address-book"></i> Address
                    </Col>
                    <Col sm="6">{user.address}</Col>
                  </Row>
                </p>
                <p className="text-secondary my-2 py-1">
                  <Row>
                    <Col sm="6">
                      <i className="far fa-compass"></i> Area PIN
                    </Col>
                    <Col sm="6">{user.pin}</Col>
                  </Row>
                </p>
                <p className="text-secondary my-2 py-1">
                  <Row>
                    <Col sm="6">
                      <i className="far fa-user"></i> Role
                    </Col>
                    <Col sm="6">{user.role}</Col>
                  </Row>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={3}>
          <div className="shadow-lg p-3 mb-5 bg-white rounded">
            {user.role != 'admin' && (
              <p className="text-wrap">
                Connect with more users by clicking below
              </p>
            )}

            {user.role === 'donor' && (
              <div>
                <button
                  className="btn btn-block btn-primary"
                  onClick={handleShow}
                >
                  Create Donation
                </button>
                {
                  (user.verified = true ? (
                    <Link
                      to="/user/requests"
                      className="btn btn-success btn-rounded btn-block"
                    >
                      View Requests
                    </Link>
                  ) : (
                    <></>
                  ))
                }
              </div>
            )}
            {user.role === 'requester' && (
              <div>
                <button
                  className="btn btn-block btn-primary"
                  onClick={handleShow}
                >
                  Create Request
                </button>
                {
                  (user.verified = true ? (
                    <Link
                      to="/user/donations"
                      className="btn btn-info btn-rounded btn-block"
                    >
                      View Donations
                    </Link>
                  ) : (
                    <></>
                  ))
                }
              </div>
            )}

            {user.role === 'admin' && (
              <div>
                <Link
                  to="/admin/dashboard"
                  className="btn btn-info btn-block rounded"
                >
                  Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {user.role === 'donor' ? 'Create Donation' : 'Create Request '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user.role === 'donor' && (
            <Form>
              <Form.Group as={Row} controlId="category">
                <Form.Label column sm="6" className="text-center">
                  Select Category
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="select"
                    aria-label="Default select example"
                    size="sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="blood">Blood Donation</option>
                    <option value="eye">Eye Donation</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="description">
                <Form.Label column sm="6" className="text-center">
                  Description
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Form>
          )}
          {user.role === 'requester' && (
            <Form>
              <Form.Group as={Row} controlId="category">
                <Form.Label column sm="6" className="text-center">
                  Select Category
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="select"
                    aria-label="Default select example"
                    size="sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="blood">Blood Request</option>
                    <option value="eye">Eye Request</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="description">
                <Form.Label column sm="6" className="text-center">
                  Description
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={user.role === 'donor' ? submitDonation : submitRequest}
            className="rounded"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {donation && (
        <div className="bg-success d-md-flex justify-content-center align-items-center flex-column">
          {' '}
          <p className="text-white mb-0 pt-2">
            Donation request is successfully created for {donation.category}{' '}
            donation{' '}
          </p>
          <p className="text-white">
            Description of request is "{donation.description}"
          </p>
        </div>
      )}

      {request && (
        <div className="bg-success d-md-flex justify-content-center align-items-center flex-column">
          {' '}
          <p className="text-white mb-0 pt-2">
            Your request is successfully created for {request.category}{' '}
          </p>
          <p className="text-white">
            Description of request is "{request.description}"
          </p>
        </div>
      )}
    </Container>
  );
};

export default UserDashboardScreen;
