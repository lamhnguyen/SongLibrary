import React, { useState } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./common/FontAwesome";
import Auth from "../security/Auth";
import AuthContext from "../security/AuthContext";
import AuthCallback from "./AuthCallback";
import PrivateRoute from "./PrivateRoute";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Alert from "./alert/Alert";
import PageNotFound from "./PageNotFound";
import AboutPage from "./about/AboutPage";
import SongsPage from "./songs/SongsPage";
import ManageSongPage from "./songs/ManageSongPage";
import ErrorBoundary from "./ErrorBoundary";

function App(props) {
  const [auth] = useState(new Auth(props.history));

  return (
    <AuthContext.Provider value={auth}>
      <Header />
      <div className="container pt-3">
        <Alert />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={SongsPage} />
            <Route
              path="/callback"
              render={(props) => <AuthCallback auth={auth} {...props} />}
            />
            <Route path="/about" component={AboutPage} />
            <Route path="/songs" component={SongsPage} />
            <Route path="/song/:slug" component={ManageSongPage} />
            <Route path="/song" component={ManageSongPage} />
            <PrivateRoute path="/private" component={AboutPage} />
            <Route component={PageNotFound} />
          </Switch>
        </ErrorBoundary>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
      <Footer />
    </AuthContext.Provider>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
