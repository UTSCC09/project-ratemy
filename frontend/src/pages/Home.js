// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5x text-center mt-4 mx-4">
      <div className="flex align-middle justify-end space-x-3 max-w-full font-bold">
        <div className="hover:text-purple-700 text-black">Sign In</div>
        <div className="hover:text-purple-700 text-black">Sign Up</div>
      </div>
      <div className="text-9xl font-bold  mt-36">
        Rate<span className="text-purple-700">My</span>
      </div>
      <div className="mt-7 text-2xl">
        Your Reviews, Your Instructors, Your Academic Impact
      </div>
      <div className="mt-20 w-6/12 mx-auto flex align-middle justify-between ">
        <div className="text-left px-2 py-3">
          Select or add a course to get started!
        </div>
        <button
          onClick={() => {
            navigate("/add-course");
          }}
          className="rounded-xl px-2 py-3 w-1/6
          bg-purple-500 text-white font-bold hover:bg-purple-700"
        >
          Add Course
        </button>
      </div>
      {/* <button
        onClick={() => {
          navigate("/add-course");
        }}
      >
        <AiOutlinePlus />
      </button> */}
    </div>
  );
};

export default Home;
