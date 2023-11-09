// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import AddReviewForm from '../components/AddReviewForm'
// Citation: rating component https://mui.com/material-ui/react-rating/

const ratingsMappings = {
    "difficulty": "Difficulty of content",
    "quality_of_teaching": "Quality of teaching",
    "staff_responsiveness": "Teaching team responsiveness",
    "usefulness_real_world": "Usefulness in real world",
    "workload": "Workload"
}

const CoursePage = () => {
    // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    const navigate = useNavigate();
    const { state } = useLocation();
    const courseId = state !== null ? state.courseId : "";
    const [course, setCourse] = useState([]);
    const [reviews, setReviews] = useState([]);
    let pageIndex = 0;
    const limit = 10;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleEditing = (e) => {
        e.preventDefault();
    }

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
    }, []);

    useEffect(() => {
        try {
            fetch(
                "http://localhost:5000/api/reviews/" + courseId + "?page=" +
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
    }, [pageIndex]);

    return (
        <div>
            <div>
                {course.code}
            </div>
            <div>
                {course.name}
            </div>

            <AddReviewForm />

            <div>
                {reviews.map((rev) => {
                    return (
                        <div
                            key={rev._id}
                            className="font-bold text-xs hover:text-black hover:bg-gray-200"
                        >
                            {Object.keys(rev.rating).map((ratingKey) => {
                                return (<span key={rev._id + ratingKey}>
                                    {ratingsMappings[ratingKey]}
                                    <Rating
                                        value={rev.rating[ratingKey]}
                                        readOnly
                                    />
                                </span>
                                );
                            })}
                            {rev.review}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CoursePage;
