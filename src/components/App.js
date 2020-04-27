import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./common/FontAwesome";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Alert from "./alert/Alert";
import PageNotFound from "./PageNotFound";
import AboutPage from "./about/AboutPage";
import SongsPage from "./songs/SongsPage";
import ManageSongPage from "./songs/ManageSongPage";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <>
      <Header />
      <div className="container pt-3">
        <Alert />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={SongsPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/songs" component={SongsPage} />
            <Route path="/song/:slug" component={ManageSongPage} />
            <Route path="/song" component={ManageSongPage} />
            <Route component={PageNotFound} />
          </Switch>
        </ErrorBoundary>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
      <Footer />
    </>
  );
}

export default App;
