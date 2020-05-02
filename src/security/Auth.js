import auth0 from "auth0-js";

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
      console.log(authResult);
      if (
        authResult &&
        authResult.accessToken &&
        authResult.idToken &&
        authResult.idTokenPayload
      ) {
        this.setSession(authResult);
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

  getName() {
    const name = localStorage.getItem("name");
    if (!name) {
      throw new Error("No name found.");
    }
    return name;
  }

  getProfile = (callback) => {
    if (this.userProfile) return callback(this.userProfile);

    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;

      callback(profile, err);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope));
  }

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
  };

  cleanUpSession = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    this.userProfile = null;
  };
}
