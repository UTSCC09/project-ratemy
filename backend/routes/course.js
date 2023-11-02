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
  
        return res.status(200).json(updatedCourse);
      } else {
        return res.status(400).json({ error: 'Professor already exists in the course.' });
      }
    } else {
      const Course = new db.models.course(courseData);
        Course.professorNames.push({
            name: professorName,
        });
      const insertedCourse = await Course.save();
      return res.status(200).json(insertedCourse);
    }
  };

