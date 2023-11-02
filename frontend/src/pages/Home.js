// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
  const navigate = useNavigate();

  return (
    <div>
      Home
      <button
        onClick={() => {
          navigate("/add-course");
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Home;
