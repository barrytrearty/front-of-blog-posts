import React, { Component } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { withRouter } from "react-router";

const NavBar = ({ history }) => {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  const apiUrl = "http://localhost:5000";

  const logOutAuthor = async () => {
    try {
      let response = await fetch(`${apiUrl}/authors/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log(response.json());
        localStorage.setItem("accessToken", "");
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/home">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <div className="d-flex">
          {token === "" || token === "'undefined'" ? (
            <div className="d-flex">
              {" "}
              <Button
                as={Link}
                to="/register"
                className="blog-navbar-add-button bg-dark"
                size="lg"
              >
                Sign Up
              </Button>
              <Button
                as={Link}
                to="/login"
                className="blog-navbar-add-button bg-dark"
                size="lg"
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="d-flex">
              <Button
                onClick={logOutAuthor}
                // as={Link}
                // to="/login"
                className="blog-navbar-add-button bg-dark"
                size="lg"
              >
                Logout
              </Button>
              <Button
                as={Link}
                to="/newBlogPost"
                className="blog-navbar-add-button bg-dark"
                size="lg"
              >
                Post Article
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
};
export default withRouter(NavBar);
