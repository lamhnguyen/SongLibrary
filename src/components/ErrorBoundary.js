import React, { Component } from "react";
import PropTypes from "prop-types";
import { logError } from "../api/logApi";

// Handling errors when rendering components
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error: error, info: info });

    // Log error
    const data = {
      error,
      stackTrace: info.componentStack,
    };

    logError(data);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops, something went wrong :(</h1>
          <p>Error: {this.state.error.toString()}</p>
          <p>Stack: {this.state.info.componentStack}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default ErrorBoundary;
