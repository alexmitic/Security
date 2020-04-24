// Routes for signup and login/logout
const express = require('express')
const router = express.Router()
const mongo = require('../db')
const passport = require('passport')
require('../passport')

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Middleware requiring the user to be authenticated
function validatePassword(req, res, next) {
  
  let pass = req.body.password;
  let name = req.body.username;

  name = escapeRegExp(name);

  //console.log(pass, name)
  // vaildate password
  if (pass.match(name)) {
    req.flash('error', 'Do not include name in password.')
    req.flash('message', 'Do not include name in password.')

    return res.redirect('/register')
  }
  next()
}

// Fixes session fixation
var session = function (req, res) {
    var temp = req.session.passport; // {user: 1}
    req.session.regenerate(function(err){
        //req.session.passport is now undefined
        req.session.passport = temp;
        req.session.save(function(err){
            res.redirect('/');
        });
    });
};

router
  // POST signup via passport local strategey
  .post('/signup',validatePassword, passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,
    successFlash: 'Account created!'
  }))

  // POST login via passport local strategey
  // .post('/login', passport.authenticate('local', {
  //   successRedirect: 'back',
  //   failureRedirect: 'back',
  //   failureFlash: true
  // }))

  .post('/login', passport.authenticate('local'), session)

  // GET Logout and redirect
  .get('/logout', (req, res) => {
    req.logout()
    // If the previous page is one of these, redirect to home
    if(req.header("Referer") === 'http://localhost:3000/other/admins'
    || req.header("Referer") === 'http://localhost:3000/settings'
    ) {
      res.redirect('/')
    // Else return to the previous page
    }else {
      res.redirect('back')
    }
  })

// Export these routes to be used in app.js
module.exports = router
