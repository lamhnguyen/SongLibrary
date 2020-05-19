import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./common/FontAwesome";
import Auth from "../security/Auth";
import AuthContext from "../security/AuthContext";
import AuthCallback from "./AuthCallback";
import PrivateRoute from "./PrivateRoute";
import Header from "./header/Header"; // eslint-disable-line import/no-named-as-default
import Footer from "./footer/Footer";
import Alert from "./alert/Alert";
import PageNotFound from "./PageNotFound";
import AboutPage from "./about/AboutPage";
import SongsPage from "./songs/SongsPage"; // eslint-disable-line import/no-named-as-default
import ViewSongPage from "./songs/ViewSongPage"; // eslint-disable-line import/no-named-as-default
import EditSongPage from "./songs/EditSongPage"; // eslint-disable-line import/no-named-as-default
import AuthorPage from "./author/AuthorPage"; // eslint-disable-line import/no-named-as-default
import ErrorBoundary from "./ErrorBoundary";

export function App(props) {
  const [auth] = useState(new Auth(props.history));

  const { isUnauthorized } = props;
  if (isUnauthorized) auth.logout();

  const authContextValue = {
    auth,
    isAuthenticated: auth.isAuthenticated(),
    isAdmin: auth.isAdmin(),
    name: auth.getName(),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
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
            <Route path="/author" component={AuthorPage} />
            <Route path="/song/:slug" component={EditSongPage} />
            <Route path="/song" component={EditSongPage} />
            <Route path="/:slug" component={ViewSongPage} />
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
  isUnauthorized: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isUnauthorized: state.apiStatus.isUnauthorized,
    logLevel: state.logLevel,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
