require('dotenv').config();
const express       = require('express'),
      bodyParser    = require('body-parser'),
      session       = require('express-session'),
      massive       = require('massive'),
      passport      = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      cors          = require('cors'),
      lC            = require('./controllers/listings_controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
});

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function(accessToken, refreshToken, extraParams, profile, done) {
    //db calls
    const db = app.get('db');
    db.find_user([profile.identities[0].user_id])
    .then( user => {
        if(user[0]) {
           return done(null, user[0].user_id);
        } else {
            const user = profile._json
            db.create_user([user.name, user.email, user.identities[0].user_id])
            .then( user => {
                return done(null,user[0].user_id)
            })
        }
    })
}));

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/',
    failureRedirect: '/auth'
}));
app.get('/auth/me', (req, res) => {
    if(!req.user) {
        return res.status(404).send("User not found");
    } else {
        return res.status(200).send(req.user);
    }
});

//LISTING ENDPOINTS
app.get('/api/listings', lC.getListings);
app.get('/api/listings/images', lC.getListingImages)
// -------------------------------------------------

app.get('/auth/logout', function(req, res) {
    req._read.logOut();
    res.redirect(302, 'http://localhost:3000/#/')
});

passport.serializeUser(function(id, done) {
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    app.get('db').find_current_user([id])
    .then( user => {
        done(null, user[0]);
    });
});

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})