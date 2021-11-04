import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/newBlogPost";
import NewAuthor from "./views/newAuthor/index.jsx";
import Login from "./views/login/index.jsx";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/register" exact component={NewAuthor} />
      <Route path="/newBlogPost" exact component={NewBlogPost} />
      <Route path="/login" exact component={Login} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
