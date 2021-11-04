import React, { useState, useEffect } from "react";

import { Container, Form, Button, Col, Card, Row } from "react-bootstrap";
import "./styles.css";
import { withRouter } from "react-router";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [authorToken, setAuthorToken] = useState("")

  const apiUrl = "http://localhost:5000";
  //const   apiUrl = process.env.REACT_APP_BE_URL;

  const loginAuthor = async () => {
    try {
      let response = await fetch(`${apiUrl}/authors/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response.json());
        // let tokenObj = response.json()
        // setAuthorToken(tokenObj.accessToken)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendAuthor = (e) => {
    e.preventDefault();
    loginAuthor();
    history.push("/");
  };

  return (
    <Container className="new-blog-container">
      <Row>
        <Col>
          <Form className="mt-5" onSubmit={sendAuthor}>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="d-flex mt-3 justify-content-end">
              <Button
                type="submit"
                size="lg"
                variant="dark"
                style={{ marginLeft: "1em" }}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
