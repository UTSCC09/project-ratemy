const db = require("../db");


module.exports.post = async (req, res) => {
    const courseData = req.body;
    const professorName = req.body.professorName;

    const existingCourse = await db.models.course.findOne({ courseCode: courseData.courseCode });

    if (existingCourse) {
        const professorExists = existingCourse.professorNames.some(professor => professor === professorName);

        if (!professorExists) {
            existingCourse.professorNames.push({
                name: professorName,
            });

            const updatedCourse = await existingCourse.save();

            return res.json(updatedCourse);
        } else {
            return res.status(400).json({ error: 'Professor already exists in the course.' });
        }
    } else {
        const Course = new db.models.course(courseData);
        Course.professorNames.push({
            name: professorName,
        });
        const insertedCourse = await Course.save();
        return res.json(insertedCourse);
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
