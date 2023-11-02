const db = require("../db");


module.exports.post = async (req, res) => {
    const courseData = req.body;
    const courseCode = req.body.courseCode;
    if (courseCode.length != 6
        || courseCode[0] < 'A' || courseCode[0] > 'Z'
        || courseCode[1] < 'A' || courseCode[1] > 'Z'
        || courseCode[2] < 'A' || courseCode[2] > 'Z'
        || courseCode[3] < 'A' || courseCode[3] > 'D'
        || courseCode[4] < '0' || courseCode[4] > '9'
        || courseCode[5] < '0' || courseCode[5] > '9') {
        return res.status(400).json({ error: 'Invalid course code.' });
    }
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

