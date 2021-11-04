import React, { useState, useEffect } from "react";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
import { Container, Form, Button, Col, Card, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import "./styles.css";

// export default class NewAuthor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       surname: "",
//       email: "",
//       password: "",
//       authors: [],
//     };
//   }
const NewAuthor = ({ history }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authors, setAuthors] = useState([]);

  const apiUrl = "http://localhost:5000";
  //const  apiUrl = process.env.REACT_APP_BE_URL;

  const getAuthorList = async () => {
    try {
      let response = await fetch(`${apiUrl}/authors`);
      let authorsList = await response.json();
      setAuthors(authorsList);
      console.log(authors);
      console.log(apiUrl);
      return authorsList;
    } catch (error) {
      console.log(error);
    }
  };

  const createAuthor = async () => {
    try {
      let response = await fetch(`${apiUrl}/authors/register`, {
        method: "POST",
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          avatar:
            "https://coursereport-production.imgix.net/uploads/school/logo/1045/original/Strive_-_logosquareblack.png?w=200&h=200&dpr=1&q=75",
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

  useEffect(() => {
    getAuthorList();
  }, []);

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState.authors !== this.state.authors) {
  //       this.getAuthorList();
  //     }
  //   }

  const sendAuthor = (e) => {
    e.preventDefault();
    createAuthor();
    getAuthorList();
    history.push("/");
  };

  // imageUpload = (e) => {
  //   this.setState({ imageFile: e.target.files[0] });
  // };

  return (
    <Container className="new-blog-container">
      <Row>
        <Col className="col-9">
          <Form className="mt-5" onSubmit={sendAuthor}>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                size="lg"
                placeholder="First name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Surname"
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
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
            {authors.map((author) => (
              <Card body key={author.id}>
                {author.name} {author.surname}
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(NewAuthor);
