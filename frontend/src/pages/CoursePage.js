// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import AddReviewForm from "../components/AddReviewForm";
// Citation: rating component https://mui.com/material-ui/react-rating/

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
    let pageIndex = 0;
    const limit = 10;

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
                    setReviews(data);
                });
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="px-6 my-36 max-w-4xl mx-auto space-y-5">
            <div className="text-5xl font-bold">{course.code}</div>
            <div className="text-2xl font-semibold text-gray-600">{course.name}</div>

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
        </div>
    );
};

export default CoursePage;
