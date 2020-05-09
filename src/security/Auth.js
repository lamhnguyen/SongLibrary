import auth0 from "auth0-js";
import * as authApi from "../api/authApi";

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
    this.auth0.authorize();
  };

  parseAuthResult = (data) => {
    if (!data.accessToken) throw new Error("Access token is required");
    if (!data.idToken) throw new Error("Id token is required");
    if (!data.idTokenPayload) throw new Error("Id token payload is required");

    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      data.expiresIn * 1000 + new Date().getTime()
    );

    const authResult = {
      accessToken: data.accessToken,
      idToken: data.idToken,
      scope: data.scope,
      expiresAt,
      authId: data.idTokenPayload.sub,
      name: data.idTokenPayload.name,
      email: data.idTokenPayload.email,
      roles: data.idTokenPayload[CLAIM_APP_METADATA].roles,
    };

    return authResult;
  };

  saveUser = (authResult) => {
    authApi
      .saveUser({
        authId: authResult.authId,
        name: authResult.name,
        email: authResult.email,
        roles: authResult.roles.join(","),
      })
      .then((user) => {
        localStorage.setItem("api_Token", user.token);
      })
      .catch((error) => {
        throw new Error(`saveUser failed - Error: ${error.message || error}`);
      });
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, data) => {
      if (err) {
        this.history.push("/");
        throw new Error(`handleAuthentication failed - Error: ${err.error}`);
      }

      const authResult = this.parseAuthResult(data);
      // If there is a value on the `scope` param from the authResult, use it to set scopes in the session for the user.
      // Otherwise use the scopes as requested. If no scopes were requested, set it to nothing
      authResult.scopes = data.scope || this.requestedScopes || "";

      this.saveUser(authResult);

      this.setSession(authResult);
      this.history.push("/");
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
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", authResult.expiresAt);
    localStorage.setItem("name", authResult.name);
    localStorage.setItem("scopes", JSON.stringify(authResult.scopes));
    localStorage.setItem("roles", authResult.roles);
  };

  cleanUpSession = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    localStorage.removeItem("name");
    localStorage.removeItem("roles");
    localStorage.removeItem("api_Token");

    this.userProfile = null;
  };
}
