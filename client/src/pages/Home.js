import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import axios from 'axios';

// //  import SingleProduct from "../cards/SingleProduct";
// import {useSelector} from 'react-redux';
// // import ProductCard from '../cards/ProductCard';
// import { Form, FormGroup, Label, Input, FormText,Button } from 'reactstrap';
// import ProductCard from '../components/cards/ProductCard';

const Home = () => {
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <div>
      <Container className="mt-5">
        <h1 className="text-center text-secondary mb-3 pb-5">
          <i className="fas fa-hands-helping "></i> Donor Finder Portal
        </h1>
        <Row>
          <Col md={4}>
            <div className="card shadow-lg p-0 mb-5 bg-white rounded card_hover">
              <img
                src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
                class="card-img-top"
                alt="..."
                style={{ height: '37vh' }}
              />
              <div className="card-body">
                <p className="card-text">
                  Want to donate blood or eye made a donation now!
                </p>
                <Link to="/login" className="btn btn-primary rounded btn-block">
                  Donate
                </Link>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card shadow-lg p-0 mb-5 bg-white rounded card_hover">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1957&q=80"
                className="card-img-top"
                alt="..."
                style={{ height: '37vh' }}
              />
              <div className="card-body">
                <p className="card-text">
                  Want blood or eye for someone, create a request to reach out
                  some donors!
                </p>
                <Link to="/login" className="btn btn-info rounded btn-block">
                  Create Request
                </Link>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card shadow-lg p-0 mb-5 bg-white rounded  card_hover">
              <img
                src="https://images.unsplash.com/photo-1618961734760-466979ce35b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80"
                className="card-img-top"
                alt="..."
                style={{ height: '37vh' }}
              />
              <div className="card-body">
                <p className="card-text">
                  Want to find vaccines available in your area, Go to our
                  vaccine finder!
                </p>
                <Link
                  to="/vaccinefinder"
                  className="btn btn-warning rounded btn-block"
                >
                  Vaccine Finder
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
