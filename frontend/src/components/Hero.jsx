import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";


function Hero() {
  const {userInfo} = useSelector((state) => state.auth)
  return (
    <div className="py-5">
      {userInfo ? <><h3 className="mb-5" >Welcome {userInfo.name}</h3></> : null}
      <Container className="d-flex justify-content-center" >
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-dark text-white w-75">
          <h1 className="text-center mb-4">Auth App</h1>
          <p className="texte-center mb-4" >
            This is a sample work to learn React + Vite, it contains both User
            and Admin side. It has included some cool features.Please feel free
            to check it out . <div style={{marginLeft:"35rem"}}><br /> Thanks ..!</div>
          </p>
         {userInfo ? null : <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Register</Button>
            </LinkContainer>
          </div>}
        </Card>
      </Container>
    </div>
  );
}

export default Hero;
