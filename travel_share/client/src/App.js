import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar.js";
import { Container } from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails.jsx";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="601916130282-39uk2phfintm3gdnakabsqmf5umcj9gr.apps.googleusercontent.com">
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="posts" />)}
            />
          </Switch>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
