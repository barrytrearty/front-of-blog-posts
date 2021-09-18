import React, { useState, useEffect } from "react";
import { Container, Image, Button, Modal, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
// import posts from "../../data/posts.json";
import "./styles.css";

const Blog = ({ match }) => {
  const { id } = match.params;

  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  // const formData = new FormData();
  // formData.append("photo", file);

  const fetchPosts = async (id) => {
    try {
      let response = await fetch(`http://localhost:3001/blogPosts/${id}`);
      let blogItem = await response.json();
      setBlog(blogItem);
      setLoading(false);
      return blogItem;
    } catch (error) {
      console.log(error);
    }
  };

  // const uploadCover = async (id) => {
  //   try {
  //     let response = await fetch(
  //       `http://localhost:3001/blogPosts/${id}/uploadCover`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // const { id } = match.params;
    console.log(id);
    fetchPosts(id);
    console.log(blog);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    const fileFormData = new FormData();
    fileFormData.append("blogPostCover", file);
    console.log(fileFormData);
    const uploadCover = async (id) => {
      try {
        let response = await fetch(
          `http://localhost:3001/blogPosts/${id}/uploadCover`,
          {
            method: "PUT",
            body: fileFormData,
          }
        );
        console.log(fileFormData.blogPostCover);
      } catch (error) {
        console.log(error);
      }
    };
    uploadCover(id);
    console.log("postPhoto");
  };

  // const { loading, blog } = state;
  // if (loading) {
  //   return <div>loading</div>;
  // } else {
  return (
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={blog.cover} fluid />
        <h1 className="blog-details-title">{blog.title}</h1>

        <div className="blog-details-container">
          <div className="blog-details-author">
            <BlogAuthor {...blog.author} />
          </div>
          <div className="blog-details-info">
            <div>{blog.createdAt}</div>
            {/* <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div> */}
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          variant="dark"
          style={{ margin: "1em" }}
        >
          {" "}
          Upload Cover
        </Button>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={open}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title>Upload Cover</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitForm}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Choose</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    const photo = e.target.files[0];
                    setFile(photo);
                  }}
                  // accept="video/*"
                  type="file"
                  placeholder="Photo"
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex mt-3">
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
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};
//   }
// }

export default withRouter(Blog);
