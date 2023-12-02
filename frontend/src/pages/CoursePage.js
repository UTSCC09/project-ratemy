// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import AddReviewForm from "../components/AddReviewForm";
import BarChart from "../components/BarChart";
//Citation: https://mui.com/material-ui/react-accordion/
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Citation: rating component https://mui.com/material-ui/react-rating/
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useAuth0 } from "@auth0/auth0-react";
import AIField from "../components/AIField";

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
  const navigate = useNavigate();
  const courseId = state !== null ? state.courseId : "";
  const [course, setCourse] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avgRatings, setAvgRatings] = useState([]);
  const [totalsRatings, setTotalsRatings] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const limit = 5;
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [profFilter, setProfFilter] = useState("");

  const handleFilterChange = (event) => {
    setProfFilter(event.target.value);
  };

  const [editPressed, setEditPressed] = useState(true);
  const [editedInput, setEditedInput] = useState("");
  
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    // Update state variables based on the selected sort
    if (selectedSort.startsWith('date')) {
      setSortBy('date');
      setSortOrder(selectedSort.endsWith('increasing') ? 'asc' : 'desc');
    }
    else if (selectedSort.startsWith('ratings-decreasing')) {
      // citation: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
      let n = selectedSort.lastIndexOf("ratings-decreasing-")
      setSortBy(selectedSort.substring(n+19));
      setSortOrder('desc');
    }
    else if (selectedSort.startsWith('ratings-increasing')) {
      // citation: https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
      let n = selectedSort.lastIndexOf("ratings-increasing-")
      setSortBy(selectedSort.substring(n+19));
      setSortOrder('asc');
    }
  };

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
          limit +
          "&sortField=" +
          sortBy +
          "&sortOrder=" +
          sortOrder +
          "&professor=" +
          profFilter
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
  }, [profFilter, pageIndex, courseId, sortBy, sortOrder]);

  const handleDelete = async (review) => {
    try {
      await fetch("http://localhost:5000/api/reviews/" + review._id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      }).then(() => {
        getData();
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEdit = async (reviewId) => {
    setEditPressed(true);

    if (editedInput !== "") {
      try {
        fetch("http://localhost:5000/api/reviews/" + reviewId, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review: editedInput,
            email: user.email,
          }),
        });
      } catch (err) {
        console.error("Error sending POST request: ", err);
      }

      setEditedInput("");
    }
  };

  return (
    <div className="px-6 my-28 max-w-4xl mx-auto space-y-5">
      <ArrowBackIcon
        fontSize="large"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="text-5xl font-bold">{course.code}</div>

      <div className="text-3xl font-bold text-purple-700">{course.name}</div>
      <div></div>
      <div>
        {totalsRatings["totals"] ? (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography component="div">
                <div className="text-xl font-bold">Overview of Ratings</div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div">
                <BarChart data={totalsRatings["totals"]} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography component="div">
            <div className="text-xl font-bold">Overall Average Ratings</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              <div className="flex flex-col justify-center items-center space-y-5">
                {Object.keys(avgRatings) ? Object.keys(avgRatings).map((ratingKey) => {
                  return (
                    <span key={ratingKey}>
                      {ratingsMappings[ratingKey]}
                      <Rating
                        value={avgRatings[ratingKey]}
                        precision={0.5}
                        readOnly
                      />
                    </span>
                  );
                }) : "No ratings"}
              </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {isAuthenticated ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
          >
            <Typography component="div">
              <div className="text-xl font-bold">Add Rating</div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <AddReviewForm
                courseId={courseId}
                setReviews={setReviews}
                reviews={reviews}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className="font-bold text-xl text-center">
          Sign in to add a review!
        </div>
      )}
      <div className="space-y-5">
        <AIField courseId={courseId} />
        <div className="text-xl font-bold text-purple-700">Reviews</div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">Sort by:</span>
            <select
              onChange={handleSortChange}
              className="p-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="date-decreasing">Date (Decreasing)</option>
              <option value="date-increasing">Date (Increasing)</option>
              {Object.keys(ratingsMappings).map((ratingKey) => (
                  <option value={`ratings-increasing-${ratingKey}`}>
                    {`${ratingsMappings[ratingKey]} (Increasing)`}
                  </option>
              ))}
              {Object.keys(ratingsMappings).map((ratingKey) => (
                  <option value={`ratings-decreasing-${ratingKey}`}>
                    {`${ratingsMappings[ratingKey]} (Decreasing)`}
                  </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">Filter Prof:</span>
            <select
              onChange={handleFilterChange}
              className="p-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">
                All
              </option>
              {course && course.professorName ? course.professorName.map((prof) => (
                  <option value={`${prof}`}>
                    {prof}
                  </option>
              )) : ""}
            </select>
          </div>
        </div>


        {reviews ? reviews.map((rev) => {
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
                {Object.keys(rev.rating) ? Object.keys(rev.rating).map((ratingKey) => {
                  return (
                    <div key={rev._id + ratingKey}>
                      <div>{ratingsMappings[ratingKey]}</div>
                      <Rating value={rev.rating[ratingKey]} readOnly />
                    </div>
                  );
                }) : "No ratings"}
                {isAuthenticated && rev.email === user.email && (
                  <div className="flex space-x-3">
                    <div className="border-2 border-gray-400 rounded-xl px-2 py-3 w-fit h-fit hover:text-black hover:border-black">
                      {editPressed ? (
                        <button onClick={() => setEditPressed(false)}>
                          Edit Review
                        </button>
                      ) : (
                        <button onClick={() => handleSaveEdit(rev._id)}>
                          Save Edit
                        </button>
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
        }) : "No reviews"}
      </div>

      {reviews == null || reviews.length === 0 ? (
        <div className="text-center p-5 text-xl font-bold">
          There are no reviews yet. Add one!
        </div>
      ) : (
        <div className="flex flex-row-reverse justify-between">
          <button
            className="rounded-xl px-2 py-3 w-fit
          bg-purple-600 text-white font-bold hover:bg-purple-700"
            onClick={() => setPageIndex((prev) => prev + 1)}
            disabled={maxPage - 1 === pageIndex}
          >
            Next
          </button>
          <button
            className="rounded-xl px-2 py-3 w-fit
          bg-purple-600 text-white font-bold hover:bg-purple-700"
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
