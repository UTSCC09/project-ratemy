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


// const openaiApiKey = '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';

// const openaiClient = new openai({ apiKey: openaiApiKey });

   
    

    app.use(cors({
        origin: "https://ratemyc.vercel.app",
        
        credentials: true, // If you need to send cookies or headers with your requests
    }));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "https://ratemyc.vercel.app");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "*");
        next();
      });
   
    
    app.use(require("./routes/handler"));
    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });
