import auth0 from "auth0-js";
// import axios from "axios";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: "dev-1f5flisp.auth0.com",
      audience: "https://dev-1f5flisp.auth0.com/userinfo",
      clientID: "mZHUe42c4yE0R1nyFzcoMGss5PwoeESZ",
      redirectUri: "http://localhost:3000/callback",
      responseType: "id_token",
      scope: "openid profile",
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
     this.auth0.authorize((err, result) => {
       if (err) console.log(err);
       console.log(result);
     });
    }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        console.log("HEY!!!!", authResult.idTokenPayload);
        // let nickname = authResult.idTokenPayload.name;
        // axios.post("/api/user", {
        //   name: nickname
        // });
        //axios.post the userInfo object (or whatever fields we need from it) to our own backend route for users.
        resolve();
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    this.auth0.logout({
      returnTo: "http://localhost:3000/",
      clientID: "mZHUe42c4yE0R1nyFzcoMGss5PwoeESZ",
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
