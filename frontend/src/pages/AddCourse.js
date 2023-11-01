import { useState } from "react";

const AddCourse = () => {
  const [courseInfo, setCourseInfo] = useState({
    dept: "",
    level: "",
    code: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(courseInfo); //Need to send to post request
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCourseInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <div className="Header">Add Course</div>
      <form onSubmit={handleSubmit}>
        <label>
          Course Department:
          <input type="text" name="dept" onChange={handleChange} required />
        </label>
        <label>
          Course Level:
          <input type="text" name="level" onChange={handleChange} required />
        </label>
        <label>
          Course Code:
          <input type="text" name="code" onChange={handleChange} required />
        </label>
        <label>
          Course Name:
          <input type="text" name="name" onChange={handleChange} required />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddCourse;
