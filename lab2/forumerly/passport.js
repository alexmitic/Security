// Passport.js logic
const mongo = require('./db')
const passport = require('passport')
const util = require("./util")
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const ObjectID = require('mongodb').ObjectID
const secrets = require('./secrets')

// Local login/signup (username and password)
passport.use(new LocalStrategy({
  passReqToCallback: true
}, authenticate))

passport.use("local-register", new LocalStrategy({
  passReqToCallback: true
}, register))

console.log(secrets.googleClientID);


// Called by auth.js via passport when a user attempts to login
function authenticate(req, username, password, done) {
  mongo.db.collection("users")
    .findOne({ lcUsername: username.toLowerCase() }, {collation: {locale: "en", strength: 2}}, async (err, user) => {
      if (err) {return done(err)}
      
      if (!user) {
        return done(null, false, { message: 'Invalid username or password.' })
      }

      if (password.length != user.password.length) {
        return done(null, false, { message: 'Invalid username or password.' })
      }
    
      for (i = 0; i < password.length; i++) {
        if (!(await util.compare(password[i],user.password[i])))
          return done(null, false, { message: 'Invalid username or password.' });
      }
    
      await util.compare('','')
      return done(null, user)
      /* Mitigation
      const maxlen = 30
      correct = true

      if (err) {return done(err)}
      
      if (!user) {
        return done(null, false, { message: 'Invalid username or password.' })
      }

      else if (password.length != user.password.length) {
        correct = false
      }
    
      for (i = 0; i <= maxlen; i++) {
        pass = i % password.length
        upass = i % user.password.length
        if (!(password[pass] == user.password[upass]))
          correct = false
      }
    
      await util.compare('','')
      if(correct)
        return done(null, user)
      else
        return done(null, false, { message: 'Invalid username or password.' });*/ 
    })
}

// Called by auth.js via passport when a user attempts to create a new account
function register(req, username, password, done) {
  // Password and username validation
  if (password !== req.body.password2) {
    return done(null, false, { message: 'Passwords do not match.' })
  }else if (username.length > 30) {
    return done(null, false, { message: 'Username cannot be longer than thirty characters.' })
  }else if (username.length < 3) {
    return done(null, false, { message: 'Username must be atleast three characters.' })
  }
  else if (! (/\d+/.test(password))) {
    return done(null, false, { message: 'Password must be composed by numbers' })
  }
  else if (password.length > 30) {
    return done(null, false, { message: 'Password cannot be longer than 10' })
  }

  var date = new Date()
  // Checks if username is already in use
  mongo.db.collection('users')
    .findOne({ lcUsername: username.toLowerCase() }, {collation: {locale: "en", strength: 2}}, (err, user) => {
      if (err) {return done(err)}
      if (user) {
        console.log('username catch')
        return done(null, false, {message:'Username is already in use.'})
      }
      // Past here will only run if the username was found to be not in use
      var newUser = {
        username: req.body.username,
        lcUsername: req.body.username.toLowerCase(),
        password: password,
        joinDate: date,
        img: '/images/profile.png'
      }

      // Insert the new username into the database
      mongo.db.collection('users')
        .insert(newUser, (err, result) => {
          if (err) {return done(err)}
          return done(null, result.ops[0])
        })

    })
}

// Passport serialize and deserialize functions
passport.serializeUser(function(user, done) {
  done(null, user._id.toHexString())
})

passport.deserializeUser(function(id, done) {
  mongo.db.collection('users')
    .findOne({ _id: new ObjectID.createFromHexString(id) }, (err, user) => {
      done(err, user)
    })
})
