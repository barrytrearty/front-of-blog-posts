import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
// import posts from "../../../data/posts.json";

export default class BlogList extends Component {
  state = { posts: [] };

  apiUrl = process.env.REACT_APP_BE_URL;

  fetchPosts = async () => {
    try {
      let response = await fetch(`${this.apiUrl}/blogPosts`);
      let postsArray = await response.json();
      this.setState({ posts: postsArray });
      return postsArray;
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchPosts();
    // fetchedPosts = fetchPosts();
    // this.setState({ posts: fetchPosts });
  }

  render() {
    return (
      <Row>
        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
