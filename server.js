//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const user = require("./routes/api/user")
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt'); 
const jwksRsa = require('jwks-rsa');
const Pusher = require("pusher");
// User Model
const Message = require("./models/Messages");
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
// --------------------------added by Mila------------
// app.post("/api/user", (req, res) => {
//     const user = new User ({
//         name: req.body.name
//     }).save((err, response) => {
//         if(err) res.status(400).send(err)
//         res.status(200).send(response)
//     })
// })

const pusher = new Pusher({
  appId: "770235",
  key: "be45f6d9f5b297267413",
  secret: "de886123630400a3ac65",
  cluster: "us2",
  encrypted: true,
});

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

app.post(
  "/message", (req, res) => {
  const payload = req.body;
  pusher.trigger("chat", "message", payload);
  //we need to create a new Message object, populate it with _userId from sessionStorage and the message itself from the payload object, and then call the .save() method on our newly constructed message object. 
  console.log("req bod", req.body);
  const newMessage = new Message ({
    _userId: req.body.userId,
    message: req.body.message
  })
        newMessage
           .save()
           .then(newMessage => {
             console.log("newMessage", newMessage);
             res.json(newMessage);
           })
           .catch(err => console.log("ERROR ERROR ERROR ERROR", err)); 
  })
  //res.send(payload) ;

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

// Connect to the Mongo DB
app.use('/api/user', user);
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/betwixt")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err => console.log(err)));


// Start the API server
app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));
