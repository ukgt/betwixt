const express = require("express");
const router = express.Router();

// User Model
const User = require("../../models/Users");

// GET route for api/user
// GET all Users
// Authentication???
router.get('/', (req, res) => {
     User.find().then(user => res.json(user))
}); 

// POST route fo api/user
// Create a Post
// Authentication???
router.post("/", (req, res) => {
     console.log("req bod", req.body);
     User.findOne({name: req.body.name}).then( user => {
          if (user) {
               //if user exists, send it back in the response:
               console.log("userExists", user);
               res.json(user);
          } else {
               //if no user is found, create one in our own db
               const newUser = new User({
                    name: req.body.name
               });
               newUser
                    .save()
                    .then(newUser => {
                         console.log("newUser", newUser);
                         res.json(newUser);
                    });
          }
          
     }).catch(err => console.log("ERROR ERROR ERROR ERROR", err));

});

// //DELETE api/user/:id
// //DELETE a User
// router.delete("/:id", (req, res) => {
//      User.findById(req.params.id)
//           .then(item => item.remove().then(() => res.json({success: true})))
//           .catch(err => res.status(404).json({ success: false}))
// });

module.exports = router;