/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
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
  let [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  let [isEmailValid, setIsEmailValid] = useState(false);
  let [isPasswordValid, setIsPasswordValid] = useState(false);
  let [emailError, setEmailError] = useState("");
  let [passError, setPassError] = useState(
    "*Min 6 chars length(Max 16 chars),should have one number and one special character"
  );
  let [authError, setAuthError] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if(auth && auth.error){
      setAuthError(auth.error.message);
    }
   
    setTimeout(() => {
      setAuthError("")
    }, 3000);
  }, [auth.error]);

  const handleEmailValidation = () => {
    let email = form.email;
    let emailTest =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(emailTest.test(email));
    if (emailTest.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordValidation = () => {
    let pass = form.password;
    if (pass.length < 6 || pass.length > 16) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    let passTest = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (passTest.test(pass)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };


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
    if (e.target.name === "email") {
      handleEmailValidation();
    }
    if (e.target.name === "password") {
      handlePasswordValidation();
    }
  };

  if (auth.user) {
    return <Redirect to="/" />;
  }

  

  const handleEmail = () => {
    console.log(isEmailValid);
    if (isEmailValid === false) {
      setEmailError("Enter Valid Email Address");
    }
    setInterval(() => {
      setEmailError("");
    }, 3000);
  };

  const handlePass = () => {
    if (isPasswordValid === false) {
      setPassError("Enter Valid Password");
    }
    setTimeout(() => {
      setPassError(
        "*Min 6 chars length (Max 16 chars),should have one number and one special character"
      );
    }, 3000);
  };

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
                  {/* {props.isSignUp ? (
                    <NavLink to="/signin">Login</NavLink>
                  ) : (
                    <NavLink to="/signup">Sign Up</NavLink>
                  )} */}
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                {props.isSignUp ? (
                  <NavLink to="/signin">
                    <Button className="google-btn">Sign In</Button>
                  </NavLink>
                ) : (
                  <NavLink to="/signup">
                    <Button className="google-btn">Sign Up</Button>
                  </NavLink>
                )}
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
                    onBlur={handleEmail}
                  />
                </Col>
                {<div style={{ fontSize: "12px" }}>{emailError}</div>}
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
                    onBlur={handlePass}
                  />
                </Col>
                {<div style={{ fontSize: "12px" }}>{passError}</div>}
              </FormGroup>
              <Row className="mb-3">
                <Col>
                  <Button
                    className="auth-btn"
                    disabled={
                      isEmailValid === false || isPasswordValid === false
                    }
                  >
                    {`${props.header} our community`}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="align-center" style={{fontSize:'12px',color:'red'}}>{authError}</p>
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
