// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import AddReviewForm from "../components/AddReviewForm";
import BarChart from "../components/BarChart";
// Citation: rating component https://mui.com/material-ui/react-rating/

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
const ratingsMappings = {
  difficulty: "Difficulty of content",
  quality_of_teaching: "Quality of teaching",
  staff_responsiveness: "Teaching team responsiveness",
  usefulness_real_world: "Usefulness in real world",
  workload: "Workload",
};

const CoursePage = () => {
  // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
  const { state } = useLocation();
  const courseId = state !== null ? state.courseId : "";
  const [course, setCourse] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avgRatings, setAvgRatings] = useState([]);
  const [totalsRatings, setTotalsRatings] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const limit = 5;
  const [user, setUser] = useState(null);
  const [editPressed, setEditPressed] = useState(true);
  const [editedInput, setEditedInput] = useState("");

  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/reviews/totals/" + courseId)
        .then((res) => res.json())
        .then((data) => {
          setTotalsRatings(data);
        });
    } catch (err) {
      console.error(err);
    }
  }, [reviews, courseId]);
  // an empty deps array -> only runs once on initial render
  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/courses/" + courseId)
        .then((res) => res.json())
        .then((data) => {
          setCourse(data);
        });
    } catch (err) {
      console.error(err);
    }
  }, [courseId]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/user", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            setUser(data);
          }
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/reviews/averages/" + courseId)
        .then((res) => res.json())
        .then((data) => {
          setAvgRatings(data);
        });
    } catch (err) {
      console.error(err);
    }
  }, [reviews, courseId]);

  const getData = async () => {
    try {
      fetch(
        "http://localhost:5000/api/reviews/" +
          courseId +
          "?page=" +
          pageIndex +
          "&limit=" +
          limit
      )
        .then((res) => res.json())
        .then((data) => {
          setReviews(data.reviews);
          setMaxPage(data.maxPage);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [pageIndex, courseId]);

  const handleDelete = async (review) => {
    try {
      await fetch("http://localhost:5000/api/reviews/" + review._id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.emails[0].value }),
      }).then(() => {
        getData();
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEdit = () => {
    setEditPressed(true);
    if (editedInput !== "") {
      // console.log(editedInput);
      // Call the BE to patch the review
      // setEditedInput("");
    }
  };

  return (
    <div className="px-6 my-36 max-w-4xl mx-auto space-y-5">
      <div className="text-5xl font-bold">{course.code}</div>
      <div className="text-2xl font-semibold text-gray-600">{course.name}</div>
      <div>
        {totalsRatings["totals"] ? (
          <BarChart data={totalsRatings["totals"]} />
        ) : (
          <p>No data available</p>
        )}{" "}
      </div>

      <div>
        {Object.keys(avgRatings).map((ratingKey) => {
          return (
            <span key={ratingKey}>
              {ratingsMappings[ratingKey]}
              <Rating value={avgRatings[ratingKey]} precision={0.5} readOnly />
            </span>
          );
        })}
      </div>

      {user ? (
        <AddReviewForm
          courseId={courseId}
          setReviews={setReviews}
          reviews={reviews}
        />
      ) : (
        <div className="font-bold text-xl text-center">
          Sign in to add a review!
        </div>
      )}
      <div className="space-y-5">
        {reviews.map((rev) => {
          // setEditedInput(rev.review);
          return (
            <div
              key={rev._id}
              className="font-bold hover:text-black hover:bg-gray-200 flex justify-between text-base p-5 rounded-xl bg-slate-50 space-x-5"
            >
              <div className="w-4/6">
                <div>Review</div>
                <div>
                  Professor:{" "}
                  <span className="font-normal"> {rev.professor}</span>
                </div>
                <textarea
                  className={`font-normal w-full h-2/3 rounded-xl  ${
                    !editPressed ? "bg-white p-2" : "bg-inherit"
                  }`}
                  onChange={(e) => {
                    setEditedInput(e.target.value);
                  }}
                  defaultValue={editedInput !== "" ? editedInput : rev.review}
                  disabled={editPressed}
                ></textarea>
              </div>

              <div className="flex flex-col flex-wrap justify-center align-center w-2/6">
                {Object.keys(rev.rating).map((ratingKey) => {
                  return (
                    <div key={rev._id + ratingKey}>
                      <div>{ratingsMappings[ratingKey]}</div>
                      <Rating value={rev.rating[ratingKey]} readOnly />
                    </div>
                  );
                })}
                {user && rev.email === user.emails[0].value && (
                  <div className="flex space-x-3">
                    <div className="border-2 border-gray-400 rounded-xl px-2 py-3 w-fit h-fit hover:text-black hover:border-black">
                      {editPressed ? (
                        <button onClick={() => setEditPressed(false)}>
                          Edit Review
                        </button>
                      ) : (
                        <button onClick={handleSaveEdit}>Save Edit</button>
                      )}
                    </div>
                    <div className="border-2 border-gray-400 rounded-xl px-2 py-3 w-fit h-fit hover:text-red-500 hover:border-red-500">
                      <button onClick={() => handleDelete(rev)}>
                        Delete Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center p-5 text-xl font-bold">
          There are no reviews yet. Add one!
        </div>
      ) : (
        <div className="flex flex-row-reverse justify-between">
          <button
            className="rounded-xl px-2 py-3 w-fit
          bg-purple-400 text-white font-bold hover:bg-purple-700"
            onClick={() => setPageIndex((prev) => prev + 1)}
            disabled={maxPage - 1 === pageIndex}
          >
            Next
          </button>
          <button
            className="rounded-xl px-2 py-3 w-fit
          bg-purple-400 text-white font-bold hover:bg-purple-700"
            onClick={() => setPageIndex((prev) => prev - 1)}
            disabled={pageIndex === 0}
          >
            Prev
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
