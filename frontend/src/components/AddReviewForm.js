// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import Rating from '@mui/material/Rating';

const ratingsMappings = {
    "difficulty": "Difficulty of content",
    "quality_of_teaching": "Quality of teaching",
    "staff_responsiveness": "Teaching team responsiveness",
    "usefulness_real_world": "Usefulness in real world",
    "workload": "Workload"
}

const CoursePage = () => {
    // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    const [prof, setProf] = useState([]);
    const [revData, setRevData] = useState({
        prof: "",
        review: "",
    })

    const [rating, setRating] = useState({
        difficulty: 0,
        quality_of_teaching: 0,
        staff_responsiveness: 0,
        usefulness_real_world: 0,
        workload: 0,
    })

    return (
        <form
            className="flex flex-col justify-center space-y-5"
        >
            <div>
                <div className="flex space-x-5">
                    {Object.keys(rating).map((ratingKey) => {
                        return (
                            <div key={ratingKey}>
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
                            </div>
                        );
                    })}

                    Professor:
                                <input
                        className="my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
                        value={revData.prof}
                        type="text"
                        name="prof"
                        onChange={(event, newVal) => {
                            var rev = { ...rating, prof: newVal };
                            setRevData(rev);
                        }}
                        placeholder="Smith"
                        required
                    />

                    Review:
                                <input
                        className="my-2 border-2 border-gray-400 rounded block py-2 px-4 w-full hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
                        value={revData.review}
                        type="text"
                        name="review"
                        onChange={(event, newVal) => {
                            var rev = { ...rating, review: newVal };
                            setRevData(rev);
                        }}
                        placeholder=""
                        required
                    />
                </div>
            </div>
        </form>
    );
};

export default CoursePage;
