// Citation: setup code to connect to mongodb https://www.mongodb.com/languages/mern-stack-tutorial

const mongoose = require("mongoose")
// var bcrypt = require('bcrypt-nodejs');

let conn;
const models = {};

const connect = (url) => {
    console.log("[DB] Attempting connection to MongoDB");

    mongoose.connect(url);

    mongoose.connection.on("error", (err) => {
        console.log(err);
        console.log("[DB] ERROR: Unable to connect to MongoDB, shutting down.");
        process.exit(1);
    });
    conn = mongoose.connection;
    conn.once("open", () => console.log("[DB] Connection to MongoDB successful."));
}

const createSchemas = () => {
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
    });
    const user = mongoose.model("user", userSchema);
    models.user = user;
    const courseSchema = new mongoose.Schema({
        courseName: { type: String, required: true },
        courseCode: { type: String, required: true, unique: true },
        professorNames: { type: Array, required: true },
    });
    
    
    const course = mongoose.model("course", courseSchema);
    models.course = course;
}

const init = (url) => {
    connect(url);
    createSchemas();
}

module.exports = {
    conn,
    models,
    init,
};