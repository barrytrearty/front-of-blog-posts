import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "", category: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
    console.log(this.state);
  }

  apiUrl = "http://localhost:5000";
  // apiUrl = process.env.REACT_APP_BE_URL;

  createBlogPost = async () => {
    try {
      let response = await fetch(`${this.apiUrl}/blogPosts`, {
        method: "POST",
        body: JSON.stringify({
          category: this.state.category,
          title: this.state.title,
          cover:
            "https://coursereport-production.imgix.net/uploads/school/logo/1045/original/Strive_-_logosquareblack.png?w=200&h=200&dpr=1&q=75",
          readTime: {
            value: 2,
            unit: "minute",
          },
          author: {
            name: "Barry Trearty",
            avatar:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScdeN66zWGCjZ1UGlTL-QZTEI_DL5d8ccAxw&usqp=CAU",
          },
          // author:[AUTHORID]
          content: this.state.text,
        }),
        headers: {
          "Content-Type": "application/json",
          // Authorization:
          // `Bearer ${AUTHORTOKEN}`,
        },
      });
      if (response.ok) {
        console.log(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendBlogPost = (e) => {
    e.preventDefault();
    this.createBlogPost();
  };

  // imageUpload = (e) => {
  //   this.setState({ imageFile: e.target.files[0] });
  // };

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={this.sendBlogPost}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              // value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
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
      </Container>
    );
  }
}
