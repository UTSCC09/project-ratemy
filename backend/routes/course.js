const db = require("../db");

// this method expects two parameters name and code in the request body. The name
// should be a string where the first 3 characters are letters, the 4th character is one of A-D
// or 1-4 and the following two characters are two digits
module.exports.post = async (req, res) => {

    if (req.body.name == null || req.body.code == null) {
        return res.status(400).json({ error: 'Missing course information.' });
    }
    const code = req.body.code.toUpperCase();

    if (code.length != 6 || !code.match(/[A-Z]{3}[A-D1-4][0-9]{2}/)) {
        return res.status(400).json({ error: 'Invalid course code.' });
    }

    const professor = req.body.professor;
    const existingCourse = await db.models.course.findOne({ code: code });

    if (existingCourse) {
        return res.status(400).json({ error: 'Course already exists' });
    } else {
        const course = new db.models.course({ name: req.body.name, code: code });
        const insertedCourse = await course.save();
        return res.status(200).json(insertedCourse);
    }
};
module.exports.getAll = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const courses = await db.models.course.find().skip(page * limit).limit(limit);
    return res.json(courses);
}
module.exports.get = async (req, res) => {
    const id = req.params.id;

    const course = await db.models.course.findById(id);
    if (course == null) {
        return res.status(404).end("Course not found");
    }
    return res.json(course);
}
