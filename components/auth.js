/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { NavLink ,Redirect} from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";
import { useAuth } from "../context/useAuth";


const Auth = (props) => {
  let [form, setForm] = useState({ email: "", password: "" });

  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isSignUp) {
      return auth.signUp(form);
    } else {
      return auth.signIn(form);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if(auth.user){
    return <Redirect to="/" />
  }
 
  return (
    <Container className="auth-page m-0 p-0 h-100" fluid>
      <Row className="m-0 h-100">
        <Col md={6} className="p-0">
          <div className="auth-image">
            <img src={props.image} alt="Auth" />
          </div>
        </Col>
        <Col md={6} className="p-0">
          <div className="auth-form">
            <Row className="mb-3">
              <Col>
                <div className="auth-header">{props.header}</div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className="auth-subheader">
                  {props.suHeader}
                  {props.isSignUp ? (
                    <NavLink to="/signin">Login</NavLink>
                  ) : (
                    <NavLink to="/signup">Sign Up</NavLink>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <NavLink to="/">
                  <Button className="google-btn">{`${props.header} via Google`}</Button>
                </NavLink>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit} className="mb-3">
              {props.isSignUp ? (
                <Row className="mb-3">
                  <Col className="names">
                    <FormGroup sm={5}>
                      <Label for="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={form["firstName"]}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup sm={5}>
                      <Label for="lastName">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={form["lastName"]}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ) : null}

              <FormGroup row className="mb-3">
                <Col>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={form["email"]}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-3">
                <Col>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={form["password"]}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
              <Row className="mb-3">
                <Col>
                  <Button className="auth-btn">
                    {`${props.header} our community`}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="align-center">
                    By joining you agree to the Terms and Privacy Policy
                  </p>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
