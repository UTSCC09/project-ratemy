import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [courseInfo, setCourseInfo] = useState({
    dept: "",
    level: "",
    num: "",
    name: "",
  });
  const [deptError, setDeptError] = useState("");
  const [levelError, setLevelError] = useState("");
  const [numError, setNumError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alphabetRegex = /^[a-zA-Z]+$/;
    const numRegex = /^[0-9]+$/;
    const levelRegex = /^[a-dA-D1-4]$/;

    if (!alphabetRegex.test(courseInfo.dept))
      setDeptError("Enter only alphabets");
    else setDeptError("");
    if (!levelRegex.test(courseInfo.level))
      setLevelError("Enter only characters from A-D or 1-4");
    else setLevelError("");
    if (!numRegex.test(courseInfo.num)) setNumError("Enter only numbers");
    else setNumError("");

    if (!deptError && !levelError && !numError) {
      try {
        await fetch("http://localhost:5000/api/course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseName: courseInfo.name,
            courseCode: (
              courseInfo.dept +
              courseInfo.level +
              courseInfo.num
            ).toUpperCase(),
            professorName: "",
          }),
        });
      } catch (err) {
        console.error("Error sending POST request:", err);
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCourseInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (
      courseInfo.dept.length === 3 &&
      courseInfo.level.length === 1 &&
      courseInfo.num.length === 2
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [courseInfo]);

  return (
    <div className="px-4 my-36 max-w-3xl mx-auto space-y-5">
      <div>
        <div className="text-5xl font-bold">Add Course</div>
        <div className="text-gray-600">
          Add a course you would like to review!
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center space-y-5"
      >
        <div>
          <div className="flex space-x-5">
            <label className="w-1/3">
              Course Department:
              <input
                className="my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
                type="text"
                name="dept"
                onChange={handleChange}
                maxLength={3}
                placeholder="CSC"
                required
              />
              <div className="text-red-500">{deptError}</div>
            </label>
            <label className="w-1/3">
              Course Level:
              <input
                className="my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
                type="text"
                name="level"
                onChange={handleChange}
                maxLength={1}
                placeholder="A"
                required
              />
              <div className="text-red-500">{levelError}</div>
            </label>
            <label className="w-1/3">
              Course Number:
              <input
                className="my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
                type="text"
                name="num"
                onChange={handleChange}
                maxLength={2}
                placeholder="20"
                required
              />
              <div className="text-red-500">{numError}</div>
            </label>
          </div>
          <label className="w-1/2">
            Course Name:
            <input
              className="my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Introduction to Computer Science I"
              required
            />
          </label>
        </div>
        <div className="flex space-x-5 font-semibold">
          <button
            className="border-2 border-gray-400 rounded-xl px-2 py-3 w-1/6 hover:bg-gray-200"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button
            disabled={buttonDisabled}
            className="border-2 border-purple-400 rounded-xl px-2 py-3 w-1/6 bg-purple-400 text-black disabled:bg-purple-300 disabled:text-gray-500 disabled:border-purple-300"
            type="submit"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
