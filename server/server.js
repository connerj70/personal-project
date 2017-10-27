require('dotenv').config();
const express       = require('express'),
      bodyParser    = require('body-parser'),
      session       = require('express-session'),
      massive       = require('massive'),
      passport      = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      cors          = require('cors'),
      lC            = require('./controllers/listings_controller'),
      mC            = require('./controllers/messages_controller'),
      uC            = require('./controllers/users_controller'),
      gC            = require('./controllers/grails_controller'),
      keyPublish    = process.env.PUBLISHABLE_KEY,
      keySecret     = process.env.SECRET_KEY;

const app = express();
const stripe = require("stripe")(keySecret)

app.use( express.static( `${__dirname}/../build`));

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
            db.create_user([user.name, user.email, user.identities[0].user_id, user.picture])
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

//STRIPE ENDPOINTS
app.get("/", (req, res) =>
res.render("index.pug", {keyPublish}));

app.post("/api/payment", (req, res) => {
    let amount = req.body.amount;
    amount = amount * 100;
    console.log(amount);
    
    const charge = stripe.charges.create({
        amount: amount,
        currency: 'usd',
        source: req.body.token.id,
        description: "Test charge from react app"
    }, function(err, charge) {
        if(err) return res.sendStatus(500)
        return res.sendStatus(200);
    });
  });
//--------------------------------------------------------------

//LISTING ENDPOINTS
app.get('/api/listings', lC.getListings);
app.get('/api/listings/images/:listingId', lC.getListingImages);
app.post('/api/listings', lC.addListing);
app.get('/api/userlistings/:userid', lC.getUserListings);
app.post('/api/userlistings/delete', lC.deleteListing);
// app.post('/api/listings/images', lC.addImages)
// -------------------------------------------------------------

//MESSAGES ENDPOINTS
app.get('/api/messages/:userid', mC.getSentMessages);
app.get('/api/recievedmessages/:userid', mC.getRecievedMessages);
app.post('/api/messages', mC.postMessage)
//--------------------------------------------------------------

//USERS ENDPOINTS
app.get('/api/users', uC.getUsers);
app.put('/api/users', uC.updateUser);
//--------------------------------------------------------------

//GRAIL ENDPOINTS
app.post('/api/grails', gC.addGrail);
app.post('/api/grails/delete', gC.removeGrail);
app.get('/api/grails/:userid', gC.getGrails);
//--------------------------------------------------------------

app.get('/auth/logout', function(req, res) {
    req.logOut();
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

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})