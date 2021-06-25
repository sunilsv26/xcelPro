import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { Redirect, NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import Usercard from "../components/UI/userCard";
import useProtectedRoute, { allUsers } from "../context/useProtectedRoute";

const icons = [
  "https://image.flaticon.com/icons/png/512/1828/1828673.png",
  "https://image.flaticon.com/icons/png/512/748/748060.png",
];

const Dashboard = () => {
  useProtectedRoute();
  const [allUsers, setAllUsers] = useState([]);
  const[isLoading,setIsLoadnig]=useState(true)
  const auth = useAuth();
  useEffect(() => {
    console.log(auth.loading);
    if (!auth.loading) {
      const data =[...auth.allUsers];
      console.log(data);
      setTimeout(() => {
        setAllUsers([...data]);
        setIsLoadnig(false)
      }, 2000);
     
    }
  }, [auth.loading]);



  return (
    <Container fluid className="p-0 h-100 dashboard">
      <Row className="m-0 h-100">
        <Col className="sidebar">
          {icons.map((icon, index) => (
            <NavLink key={index} to="/">
              <div className="sidebar-icon">
                <img src={icon} alt="Icon" />
              </div>
            </NavLink>
          ))}
        </Col>
        <Col className="menu">
          <Row className="topbar">
            <Col xs="6">
              <div className="dashboard">DASHBOARD</div>
            </Col>
            <Col xs="6" className="user-img-logout">
              <Button className="logout-btn" onClick={() => auth.signOut()}>
                Logout
              </Button>
              <div className="user-img">
                <img src="https://picsum.photos/200" alt="User Image" />
              </div>
            </Col>
          </Row>
          <Row className="users">
            {isLoading ? <h3>Loading...</h3>:null}
            {!auth.loading &&
              auth.allUsers.map((user) => {
                const { firstName, lastName, image, email, key } = user;
                return (
                  <Usercard
                    key={key}
                    name={firstName}
                    lastName={lastName}
                    email={email}
                    phone={key}
                    image={image}
                  />
                );
              })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
