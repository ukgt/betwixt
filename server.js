//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const user = require("./routes/api/user")
onst cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt'); 
const jwksRsa = require('jwks-rsa');

const app = express();
 
const PORT = process.env.PORT || 3001;

//Bodyparser Middleware
app.use(bodyParser.json());

// enhance your app security with Helmet
app.use(helmet());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use('/api/user', user);

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-1f5flisp.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'mZHUe42c4yE0R1nyFzcoMGss5PwoeESZ',
    issuer: `https://dev-1f5flisp.auth0.com/`,
    algorithms: ['RS256']
});

// Connect to the Mongo DB
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err => console.log(err)));


// Start the API server
app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));
