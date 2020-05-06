import auth0 from "auth0-js";
import { login } from "../api/authApi";

const CLAIM_APP_METADATA = "http://songlibrary.net/app_metadata";

const ROLE_ADMIN = "Admin";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email";
    this.auth0 = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  login = () => {
    this.auth0.authorize({ mode: "signUp" });
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      // console.log(authResult);
      if (
        authResult &&
        authResult.accessToken &&
        authResult.idToken &&
        authResult.idTokenPayload
      ) {
        this.setSession(authResult);

        login({
          authId: authResult.idTokenPayload.sub,
          name: authResult.idTokenPayload.name,
          email: authResult.idTokenPayload.email,
        });

        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        throw new Error(`handleAuthentication failed - Error: ${err.error}`);
      }
    });
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    this.cleanUpSession();

    this.auth0.logout({
      clientID: process.env.AUTH0_CLIENT_ID,
      returnTo: process.env.URL,
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = (callback) => {
    if (this.isAuthenticated() == false) return null;

    if (this.userProfile) return callback(this.userProfile);

    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;

      callback(profile, err);
    });
  };

  getName = () => {
    return localStorage.getItem("name") || "";
  };

  getRoles = () => {
    const roles = localStorage.getItem("roles") || "";
    return roles.split(",");
  };

  isAdmin = () => {
    return this.userHasRoles([ROLE_ADMIN]);
  };

  getScopes = () => {
    const scopes = JSON.parse(localStorage.getItem("scopes")) || "";
    return scopes.split(" ");
  };

  userHasRoles = (roles) => {
    const assignedRoles = this.getRoles();
    return roles.every((role) => assignedRoles.includes(role));
  };

  userHasScopes = (scopes) => {
    const grantedScopes = this.getScopes();
    return scopes.every((scope) => grantedScopes.includes(scope));
  };

  setSession = (authResult) => {
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    // If there is a value on the `scope` param from the authResult, use it to set scopes in the session for the user.
    // Otherwise use the scopes as requested. If no scopes were requested, set it to nothing
    const scopes = authResult.scope || this.requestedScopes || "";

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
    localStorage.setItem("user_id", authResult.idTokenPayload.sub);
    localStorage.setItem("name", authResult.idTokenPayload.name);
    localStorage.setItem("email", authResult.idTokenPayload.email);
    localStorage.setItem(
      "roles",
      authResult.idTokenPayload[CLAIM_APP_METADATA].roles
    );
  };

  cleanUpSession = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("roles");

    this.userProfile = null;
  };
}
