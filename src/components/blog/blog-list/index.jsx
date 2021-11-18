import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import { withRouter } from "react-router";

const BlogList = ({ match }) => {
  const [posts, setPosts] = useState([]);

  const apiUrl = "http://localhost:5000";
  // apiUrl = process.env.REACT_APP_BE_URL;

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      let response = await fetch(`${apiUrl}/authors/me/stories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let postsArray = await response.json();
      setPosts(postsArray);
      return postsArray;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get("accessToken");

    if (paramToken) {
      localStorage.setItem("accessToken", paramToken);
    }
    fetchPosts();
  }, []);

  return (
    <Row>
      {posts.map((post) => (
        <Col md={4} style={{ marginBottom: 50 }}>
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default withRouter(BlogList);
