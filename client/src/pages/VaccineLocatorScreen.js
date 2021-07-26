import React, { useState, useEffect } from 'react';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const VaccineLocatorScreen = () => {
  const [pin, setPin] = useState('');
  const today = new Date();
  const [session, setSession] = useState([]);
  const [states, setStates] = useState([]);
  const [sid, setSid] = useState('state');
  const [cities, setCities] = useState([]);
  const [cid, setCid] = useState('city');

  console.log(sid);

  const [calender, setCalender] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );

  const submitHandler = (e) => {
    e.preventDefault();

    getSessions(pin, calender);
  };

  const getSessions = async (pin, calender) => {
    const { data } = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${
        calender.split('-')[2]
      }-${calender.split('-')[1]}-${calender.split('-')[0]}`
    );
    const { sessions } = data;
    setSession(sessions);
  };

  const submitHandler2 = (e) => {
    e.preventDefault();

    getSessionsByCity(cid, calender);
  };

  const getSessionsByCity = async (cid, calender) => {
    const { data } = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${cid}&date=${
        calender.split('-')[2]
      }-${calender.split('-')[1]}-${calender.split('-')[0]}`
    );
    const { sessions } = data;
    setSession(sessions);
  };

  useEffect(() => {
    const getStates = async () => {
      const { data } = await axios.get(
        'https://cdn-api.co-vin.in/api/v2/admin/location/states'
      );
      const { states } = data;
      setStates(states);
    };

    getStates();
  }, []);

  useEffect(() => {
    const getCities = async (sid) => {
      const { data } = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${sid}`
      );
      const { districts } = data;
      setCities(districts);
    };

    getCities(sid);
  }, [sid]);

  return (
    <Container>
      <h1 className="pt-3 text-center text-secondary">Vaccine Finder</h1>
      <Card className="my-5 shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group as={Row} controlId="pin">
              <Form.Label column sm="2" size="sm">
                Search By PIN
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Enter your PIN"
                  value={pin}
                  required
                  onChange={(e) => setPin(e.target.value)}
                ></Form.Control>
              </Col>
              <Col sm="3">
                <Form.Control
                  size="sm"
                  type="date"
                  placeholder="Enter Date"
                  value={calender}
                  required
                  onChange={(e) => setCalender(e.target.value)}
                ></Form.Control>
              </Col>
              <Col sm="2">
                <Button className="btn btn-dark" type="submit" size="sm">
                  Search
                </Button>
              </Col>
            </Form.Group>
          </Form>
          <div className="text-center mb-2">OR</div>
          <Form onSubmit={submitHandler2}>
            <Form.Group as={Row} controlId="district">
              <Form.Label column sm="2" size="sm">
                Search By District
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  size="sm"
                  value={sid}
                  onChange={(e) => setSid(e.target.value)}
                >
                  <option disabled value="state">
                    Select State
                  </option>
                  {states.length > 0 &&
                    states.map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
              <Col sm="3">
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  size="sm"
                  value={cid}
                  onChange={(e) => setCid(e.target.value)}
                >
                  <option disabled value="city">
                    Select City
                  </option>
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <option key={city.district_id} value={city.district_id}>
                        {city.district_name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
              <Col sm="3">
                <Form.Control
                  size="sm"
                  type="date"
                  placeholder="Enter Date"
                  value={calender}
                  required
                  onChange={(e) => setCalender(e.target.value)}
                ></Form.Control>
              </Col>
              <Col sm="1">
                <Button className="btn btn-dark" type="submit" size="sm">
                  Search
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Container className="">
        {session.length > 0 ? (
          <div>
            {session.map((ses, index) => (
              <div
                className="my-1 shadow-lg p-3 mb-2 bg-white rounded border border-warning"
                key={index}
              >
                <Row>
                  <Col sm="6" className="text-center">
                    <h5>{ses.name}</h5>
                    <p className="text-secondary">{ses.address}</p>
                    <div>
                      <p className="text-success">
                        Area PIN : {ses.pincode}, District : {ses.district_name}
                        , State : {ses.state_name}{' '}
                      </p>
                      <div className="d-flex justify-content-center">
                        {ses.allow_all_age === true ? (
                          <p className="badge badge-dark text-light rounded">
                            {ses.min_age_limit} & above
                          </p>
                        ) : (
                          <p className="badge badge-primary text-light rounded">
                            {ses.min_age_limit}+
                          </p>
                        )}
                        <p className="badge badge-info text-light ml-2 rounded">
                          {ses.fee_type}
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="6" className="text-center">
                    <p className="text-info">{ses.vaccine}</p>
                    <div className="d-flex justify-content-center">
                      <p
                        className={
                          ses.available_capacity_dose1 > 0
                            ? 'badge badge-success rounded'
                            : 'badge badge-danger rounded'
                        }
                      >
                        Dose 1 : {ses.available_capacity_dose1}
                      </p>
                      <p
                        className={
                          ses.available_capacity_dose2 > 0
                            ? 'ml-3 badge badge-success rounded'
                            : 'ml-3 badge badge-danger rounded'
                        }
                      >
                        Dose 2 : {ses.available_capacity_dose2}
                      </p>
                    </div>
                    <a
                      href="https://www.cowin.gov.in/"
                      className="btn btn-primary"
                    >
                      Book At Cowin !
                    </a>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-danger text-center">
            No Vaccines Available. Search Again!
          </h3>
        )}
      </Container>
    </Container>
  );
};

export default VaccineLocatorScreen;
