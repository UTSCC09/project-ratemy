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
  const [user, setUser] = useState(null);

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

  //   useEffect(() => {
  //     try {
  //       fetch(
  //         "http://localhost:5000/api/reviews/" +
  //           courseId +
  //           "?page=" +
  //           pageIndex +
  //           "&limit=" +
  //           limit
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setReviews(data.reviews);
  //           setMaxPage(data.maxPage);
  //         });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }, [pageIndex, courseId]);

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

  return (
    <div className="px-6 my-36 max-w-4xl mx-auto space-y-5">
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
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  <div className="text-xl font-bold">Overview of Ratings</div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <BarChart data={totalsRatings["totals"]} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography>
              <div className="text-xl font-bold">Overall Average Ratings</div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="flex flex-col justify-center items-center space-y-5">
                {Object.keys(avgRatings).map((ratingKey) => {
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
                })}
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      {user ? (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>
                <div className="text-xl font-bold">Add Rating</div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <AddReviewForm
                  courseId={courseId}
                  setReviews={setReviews}
                  reviews={reviews}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <div className="font-bold text-xl text-center">
          Sign in to add a review!
        </div>
      )}
      <div className="space-y-5">
        <div className="text-xl font-bold text-purple-700">Reviews</div>
        {reviews.map((rev) => {
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
                <div className="font-normal">{rev.review}</div>
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
                      <button>Edit Review</button>
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
