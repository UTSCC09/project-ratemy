// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const limit = 5;
  const [user, setUser] = useState(null);
  const [maxPage, setMaxPage] = useState(0);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/user", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
            setUser(null);
            return;
          }
          console.log(data);
          setUser(data);
        });
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(
        "http://localhost:5000/api/courses?page=" +
          pageIndex +
          "&limit=" +
          limit
      )
        .then((res) => res.json())
        .then((data) => {
          setCourses(data.courses);
          setMaxPage(data.maxPage);
        });
    } catch (err) {
      console.error(err);
    }
  }, [pageIndex]);

  return (
    <div className="mx-auto text-center mt-4">
      <div className="flex align-middle justify-end space-x-3 max-w-full font-bold mx-4">
        {user ? (
          <a href="http://localhost:5000/api/auth/logout">
            <div className="hover:text-purple-700 text-black">
              {user.displayName}, Logout
            </div>
          </a>
        ) : (
          <a href="http://localhost:5000/api/auth/login">
            <div className="hover:text-purple-700 text-black">
              Sign In/Sign Up
            </div>
          </a>
        )}
      </div>
      <div className="text-9xl font-bold  mt-36">
        Rate<span className="text-purple-700">My</span>
      </div>
      <div className="mt-7 text-2xl">
        Your Reviews, Your Instructors, Your Academic Impact
      </div>
      <div className="mt-20 w-6/12 mx-auto">
        <div className="flex align-middle justify-between">
          <div className="px-2 py-3">
            Select or add a course to get started!
          </div>
          <button
            onClick={() => {
              navigate("/add-course");
            }}
            className="rounded-xl px-2 py-3 w-fill
          bg-purple-500 text-white font-bold hover:bg-purple-700"
          >
            Add Course
          </button>
        </div>
        <div className="flex flex-col text-left px-4 py-4 space-y-3 my-4 text-purple-700 border-solid border border-black rounded-xl">
          {courses.map((course) => {
            return (
              <button
                key={course._id}
                onClick={() => {
                  navigate("/course", { state: { courseId: course._id } });
                }}
                className="font-bold text-2xl hover:text-black hover:bg-gray-200"
              >
                {course.code}
              </button>
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
