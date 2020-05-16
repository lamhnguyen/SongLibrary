import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import "./confirm.css";

let confirmResolve;
const defaultProps = {
  title: "Confirmation",
  message: "Are you sure?",
};

class Confirm extends Component {
  static create(props = {}) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    return render(<Confirm confirmProps={props} />, container);
  }

  constructor() {
    super();

    this.state = {
      isOpen: false,
      confirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    confirmResolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    confirmResolve(true);
  }

  show(props = {}) {
    const confirmProps = { ...this.props.confirmProps, ...props };
    this.setState({ isOpen: true, confirmProps });

    return new Promise((resolve /*, reject*/) => {
      confirmResolve = resolve;
    });
  }

  render() {
    const { isOpen, confirmProps } = this.state;
    const { message, title } = confirmProps;
    return (
      <div
        style={{ display: !isOpen ? "none" : "block" }}
        className="modal"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title || defaultProps.title}</h5>
              <button
                type="button"
                className="close"
                onClick={this.handleCancel}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">{message || defaultProps.message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleConfirm}
              >
                OK
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  confirmProps: PropTypes.object.isRequired,
};

export default Confirm;
