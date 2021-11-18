import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import { withRouter } from "react-router";

const NewBlogPost = ({ history }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleChange = (value) => {
    setText(value);
  };

  const apiUrl = "http://localhost:5000";
  // apiUrl = process.env.REACT_APP_BE_URL;

  const createBlogPost = async () => {
    try {
      let response = await fetch(`${apiUrl}/blogPosts`, {
        method: "POST",
        body: JSON.stringify({
          category,
          title,
          cover:
            "https://coursereport-production.imgix.net/uploads/school/logo/1045/original/Strive_-_logosquareblack.png?w=200&h=200&dpr=1&q=75",
          readTime: {
            value: 2,
            unit: "minute",
          },
          content: text,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log(response.json());
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendBlogPost = (e) => {
    e.preventDefault();
    createBlogPost();
  };

  // imageUpload = (e) => {
  //   this.setState({ imageFile: e.target.files[0] });
  // };

  // render() {
  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={sendBlogPost}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            // value={state.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            onChange={(e) => setCategory(e.target.value)}
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
            value={text}
            onChange={handleChange}
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
};

export default withRouter(NewBlogPost);
