const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(400).send({ error: 'Please provide email and password'});
  }

  // see if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if(err) { return next(err); }

    if(existingUser) {
      return res.status(400).send({ error: 'Email already exist'});
    }

    const user = new User({
      email: email,
      password: password,
    });

    user.save(err => {
      if(err) { return next(err); }

      res.json({ token: tokenForUser(user) });
    })

  });

}
