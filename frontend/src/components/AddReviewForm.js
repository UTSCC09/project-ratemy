// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";

import { useAuth0 } from "@auth0/auth0-react";
const ratingsMappings = {
  difficulty: "Difficulty of content",
  quality_of_teaching: "Quality of teaching",
  staff_responsiveness: "Teaching team responsiveness",
  usefulness_real_world: "Usefulness in real world",
  workload: "Workload",
};

const CoursePage = ({ courseId, reviews, setReviews }) => {
  // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
  const [revData, setRevData] = useState({
    prof: "",
    review: "",
  });
  const [addNewProf, setAddNewProf] = useState(false);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setAddNewProf(value === "addNew");
    setRevData((prev) => ({ ...prev, prof: value === "addNew" ? "" : value }));
  };

  const [course, setCourse] = useState({});
  const [rating, setRating] = useState({
    difficulty: 0,
    quality_of_teaching: 0,
    staff_responsiveness: 0,
    usefulness_real_world: 0,
    workload: 0,
  });
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const getCourse = () => {
    try {
      fetch("https://ratemybe-w9w1.onrender.com/api/courses/" + courseId)
        .then((res) => res.json())
        .then((data) => {
          setCourse(data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyObject = {
      course_id: courseId,
      rating: rating,
      review: revData.review,
      email: user.email,
      professor: revData.prof,
    };
    try {
      const accessToken = await getAccessTokenSilently();
      fetch("https://ratemybe-w9w1.onrender.com/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyObject),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setReviews((reviews) => [...reviews, data]);
            getCourse();
          });
        }
      });

      setRevData({
        prof: "",
        review: "",
      });

      setRating({
        difficulty: 0,
        quality_of_teaching: 0,
        staff_responsiveness: 0,
        usefulness_real_world: 0,
        workload: 0,
      });
    } catch (err) {
      console.error("Error sending POST request: ", err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRevData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        {Object.keys(rating)
          ? Object.keys(rating).map((ratingKey) => {
            return (
              <div
                key={ratingKey}
                className="flex flex-col justify-center items-center border hover:border-purple-700 rounded-xl p-5 gap-3 my-3 w-4/6 mx-auto"
              >
                <span className="text-lg flex justify-between">
                  {ratingsMappings[ratingKey]}
                  <Rating
                    value={rating[ratingKey]}
                    onChange={(event, newValue) => {
                      var rev = { ...rating };
                      rev[ratingKey] = newValue;
                      setRating(rev);
                    }}
                    name="simple-controlled"
                  />
                </span>
              </div>
            );
          })
          : "No ratings"}
        {/* <div className="w-4/6 mx-auto">
          <label>Professor:</label>
          <input
            className=" mx-auto my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
            value={revData.prof}
            type="text"
            name="prof"
            onChange={handleChange}
            placeholder="Smith"
            required
          />
        </div> */}
        <div className="w-4/6 mx-auto">
          <label>Professor:</label>
          <select
            onChange={handleSelectChange}
            className="mx-auto my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
            value={addNewProf ? "addNew" : revData.prof}
            name="prof"
          >
            <option value="" disabled>
              Select a professor or add a new one
            </option>
            {course.professorName
              ? course.professorName.map((professor) => (
                <option key={professor} value={professor}>
                  {professor}
                </option>
              ))
              : ""}
            <option value="addNew">Add New Professor</option>
          </select>
          {addNewProf && (
            <input
              className="mx-auto my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
              value={revData.prof}
              onChange={handleChange}
              name="prof"
              placeholder="Enter new professor name"
            />
          )}
        </div>
        <div className="w-4/6 mx-auto">
          <label>Review:</label>
          <textarea
            className="my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
            value={revData.review}
            type="text"
            name="review"
            onChange={handleChange}
            placeholder="Smith"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="rounded-xl px-2 py-3 w-1/6
            bg-purple-500 text-white font-bold hover:bg-purple-700 disabled:bg-purple-300 disabled:border-purple-300 my-5 mx-auto"
        >
          Add Review
        </button>
      </div>
    </form>
  );
};

export default CoursePage;
