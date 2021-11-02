import React, { Component } from "react";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
import { Container, Form, Button, Col, Card, Row } from "react-bootstrap";
import "./styles.css";
export default class NewAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      authors: [],
    };
  }

  apiUrl = process.env.REACT_APP_BE_URL;

  getAuthorList = async () => {
    try {
      let response = await fetch(`${this.apiUrl}/authors`);
      let authorsList = await response.json();
      this.setState({ authors: authorsList });
      console.log(this.state.authors);
      return authorsList;
    } catch (error) {
      console.log(error);
    }
  };

  createAuthor = async () => {
    try {
      let response = await fetch(`${this.apiUrl}/authors`, {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
          avatar:
            "https://coursereport-production.imgix.net/uploads/school/logo/1045/original/Strive_-_logosquareblack.png?w=200&h=200&dpr=1&q=75",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getAuthorList();
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState.authors !== this.state.authors) {
  //       this.getAuthorList();
  //     }
  //   }

  sendAuthor = (e) => {
    e.preventDefault();
    this.createAuthor();
    this.getAuthorList();
  };

  // imageUpload = (e) => {
  //   this.setState({ imageFile: e.target.files[0] });
  // };

  render() {
    return (
      <Container className="new-blog-container">
        <Row>
          <Col className="col-9">
            <Form className="mt-5" onSubmit={this.sendAuthor}>
              <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="First name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="Surname"
                  onChange={(e) => this.setState({ surname: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="Email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
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
          </Col>
          <Col className="col-3">
            <div className="mt-5">
              <Card body>
                <h4>Authors</h4>
              </Card>
              {this.state.authors.map((author) => (
                <Card body key={author.id}>
                  {author.name} {author.surname}
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
