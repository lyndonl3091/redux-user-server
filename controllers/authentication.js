const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // see if a user with the given email exists
  User.findOne({ email: email }, (err, user) => {
    
  })

  // if exists, return err

  // if not exist, create and save user record

  // Respond to request indicating the user was created
}
