import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./store/configureStore";
import App from "./components/App"; // eslint-disable-line import/no-named-as-default
import "./index.css";

export const store = configureStore();
// console.log(store.getState());

// App gets the history object from the Route
render(
  <ReduxProvider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
