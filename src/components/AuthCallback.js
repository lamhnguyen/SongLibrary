import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "../security/AuthContext";
import Spinner from "./common/Spinner";
import { toUrl } from "../core/helper";

const AuthCallback = ({ location }) => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error(`Invalid callback URL - Url: ${toUrl(location)}`);
    }
  });

  return <Spinner />;
};

AuthCallback.propTypes = {
  location: PropTypes.object.isRequired,
};

export default AuthCallback;
