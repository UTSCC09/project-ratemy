const passport = require("passport");
const querystring = require("querystring");
//Citation: https://auth0.com/blog/create-a-simple-and-secure-node-express-app/
//setting up the passport and auth0 from the above citation

exports.login = (req, res) => {
    
    passport.authenticate("auth0", {
        scope: "openid email profile",
    })(req, res);
};


exports.callback = (req, res, next) => {
    
    passport.authenticate("auth0", (err, user, info) => {
        
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login"); 
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            
            const returnTo = req.session.returnTo;//
            delete req.session.returnTo;
            res.redirect(returnTo || "http://localhost:3000");
        });
    })(req, res, next);
};


exports.logout = (req, res) => {

    req.logOut((err) => {
        if (err) {
            console.log(err);

        }
    });

    let returnTo = req.protocol + "://" + "localhost";
    const port = req.connection.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo =
            process.env.NODE_ENV === "production"
                ? `${returnTo}/`
                : `${returnTo}:3000/`;
    }

    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);

    const searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo,
    });
    logoutURL.search = searchString;
    console.log(logoutURL);
    res.redirect(logoutURL);
};

