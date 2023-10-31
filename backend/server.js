// Citation: The setup lines of the following code is from https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/
// https://www.mongodb.com/languages/mern-stack-tutorial

const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const db = require("./db");
db.init(process.env.ATLAS_URI)

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(require("./routes/handler"));

// get driver connection
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});