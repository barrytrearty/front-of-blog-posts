import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
// export default class BlogAuthor extends Component {
const BlogAuthor = (author) => {
  return (
    <Row>
      {console.log(author)}
      <Col xs={2}>
        {/* <Image className="blog-author" src={author.avatar} roundedCircle /> */}
      </Col>
      <Col>
        <div>by</div>
        <h6>{author.name}</h6>
      </Col>
    </Row>
  );
  // }
};

export default BlogAuthor;
