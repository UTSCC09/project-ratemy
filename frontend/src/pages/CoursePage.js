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

    useEffect(() => {
        try {
            fetch("http://localhost:5000/api/reviews/totals/" + courseId)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setTotalsRatings(data);
                });
        } catch (err) {
            console.error(err);
        }
    }, [reviews]);
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
                    console.log(data);
                    setAvgRatings(data);
                });
        } catch (err) {
            console.error(err);
        }
    }, [reviews]);
    useEffect(() => {
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
                    console.log(data);
                    console.log(pageIndex);
                    setReviews(data.reviews);
                    setMaxPage(data.maxPage);
                });
        } catch (err) {
            console.error(err);
        }
    }, [pageIndex, courseId]);

  useEffect(() => {
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
  }, [pageIndex, courseId]);

    return (
        <div className="px-6 my-36 max-w-4xl mx-auto space-y-5">
            <div className="text-5xl font-bold">{course.code}</div>
            <div className="text-2xl font-semibold text-gray-600">{course.name}</div>
            <div>
                {totalsRatings["totals"] ? (
                    <BarChart data={totalsRatings["totals"]} />
                ) : (
                        <p>No data available</p>
                    )}            </div>

            <div>
                {Object.keys(avgRatings).map((ratingKey) => {
                    return (<span key={ratingKey}>
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

            <AddReviewForm
                courseId={courseId}
                setReviews={setReviews}
                reviews={reviews}
            />
        <div className="space-y-5">
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
                        </div>
                    </div>
                );
            })}
        </div>

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
    </div>
  );
};

export default CoursePage;
