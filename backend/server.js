// Citation: The setup lines of the following code is from https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/
// https://www.mongodb.com/languages/mern-stack-tutorial
    const express = require("express");
    const cors = require("cors");
    require("dotenv").config(); // Load environment variables
    require("dotenv").config({ path: "./config.env" });
    const path = require("path");
    const session = require("express-session");
    const passport = require("passport");
    const Auth0Strategy = require("passport-auth0");

    const db = require("./db");
    db.init(process.env.ATLAS_URI);

    const app = express();
    const port = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    /**
     * Session Configuration
     */
    const sessionConfig = {
    secret: process.env.SESSION_SECRET, 
    cookie: {},
    resave: false,
    saveUninitialized: false,
    };
    app.use(session(sessionConfig));

    /**
     * Passport Configuration
     */
    const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    function (accessToken, refreshToken, extraParams, profile, done) {

        return done(null, profile);
    }
    );
    passport.use(strategy);
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
    done(null, user);
    });
    

    app.use(cors({
      origin: "http://localhost:3000",
      credentials: true, // If you need to send cookies or headers with your requests
    }));
    passport.deserializeUser((user, done) => {
    done(null, user);
    });
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "*");
        next();
      });
    app.use(require("./routes/handler"));
    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });
