import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dismissInfo, dismissError } from "../../actions/alertActions";

const Alert = ({ infoMessage, errorMessage, dismissInfo, dismissError }) => {
  return (
    <>
      {errorMessage == null ? (
        ""
      ) : (
        <div className="card border-danger mb-3">
          <div className="card-header py-2">
            Error
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => dismissError()}
            >
              {" "}
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body py-2">{errorMessage}</div>
        </div>
      )}
      {infoMessage == null ? (
        ""
      ) : (
        <div className="card border-primary mb-3">
          <div className="card-header py-2">
            Information
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => dismissInfo()}
            >
              {" "}
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body py-2">{infoMessage}</div>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  dismissInfo: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    infoMessage: state.alert.infoMessage,
    errorMessage: state.alert.errorMessage,
  };
}

const mapDispatchToProps = {
  dismissInfo,
  dismissError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
