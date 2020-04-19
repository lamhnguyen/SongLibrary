import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./common/FontAwesome";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import PageNotFound from "./PageNotFound";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";

function App() {
  return (
    <>
      <Header />
      <div className="container pt-3">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route component={PageNotFound} />
        </Switch>

        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
      <Footer />
    </>
  );
}

export default App;
