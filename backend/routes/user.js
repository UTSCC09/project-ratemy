const db = require("../db");

module.exports.post = async (req, res) => {
    var userData = req.body;

    const user = new db.models.user(userData);

    // Citation: https://dev.to/franciscomendes10866/setup-mongodb-with-mongoose-and-express-4c58

    const insertedUser = await user.save();
    return res.status(200).json(insertedUser);
}

module.exports.get = async (req, res) => {
    const { id } = req.params;
    console.log("id is  ", id)
    const user = await db.models.user.findById(id);
    if (user == null) {
        return res.status(404).end("User not found");
    }
    return res.status(200).json(user);
}