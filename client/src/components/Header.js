import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="/" className="ml-3">
          <i className="fas fa-hands-helping"></i> Donor Finder Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-auto">
            <Nav.Link href="/" className="mr-3">
              <i className="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link href="/vaccinefinder">
              <i className="fas fa-syringe"></i> Vaccine Finder
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user.name} id="username">
                <LinkContainer
                  to="/user/dashboard"
                  className="bg-white text-primary"
                >
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/" className="bg-white text-primary">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <div className="d-md-flex">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
