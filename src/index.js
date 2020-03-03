import "./firebase";
import "./resources/css/app.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { firebase } from "./firebase";

import Routes from "./routes";

const App = props => (
  <Router>
    <Routes {...props} />
  </Router>
);

firebase.auth().onAuthStateChanged(user => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
