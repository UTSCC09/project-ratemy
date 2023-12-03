// Citation: icons from https://react-icons.github.io/react-icons/search?q=plus
// import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "../components/LoginButton";
import Profile from "../components/Profile";
const Home = () => {
  // Citation: navigate react router https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const limit = 5;

  const [maxPage, setMaxPage] = useState(0);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const handleClear = async () => {
    setSearchInput("");
    setPageIndex(0);
    fetchCourses();
  };

  const handleSearch = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `https://ratemybe-w9w1.onrender.com/api/courses/search/${searchInput}?page=${pageIndex}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      // Get the access token
      // const accessToken = await getAccessTokenSilently();

      // Make the fetch request with the access token in the Authorization header
      const response = await fetch(
        `https://ratemybe-w9w1.onrender.com/api/courses?page=${pageIndex}&limit=${limit}`,
        {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      handleSearch();
    } else {
      fetchCourses();
    }
  }, [getAccessTokenSilently, pageIndex]);

  return (
    <div className="mx-auto text-center mt-4">
      <div className="flex align-middle justify-end space-x-3 max-w-full font-bold mx-4">
        {isAuthenticated ? (
          <div className="hover:text-purple-700 text-black">
            {user.name}, <LogoutButton> </LogoutButton>
          </div>
        ) : (
          <div className="hover:text-purple-700 text-black">
            <LoginButton> </LoginButton>
          </div>
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
          bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:bg-purple-300"
            disabled={user ? false : true}
          >
            Add Course
          </button>
        </div>
        <div className="flex align-middle justify-between pt-5">
          <input
            type="text"
            placeholder="Search by course code"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            onClick={() => {
              setPageIndex(0);
              handleSearch();
            }}
            className="bg-purple-600 text-white font-bold px-4 py-2 rounded-md ml-2"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="bg-purple-600 text-white font-bold px-4 py-2 rounded-md ml-2"
          >
            Clear
          </button>
        </div>
        <div className="flex flex-col text-left px-4 py-4 space-y-3 my-4 text-purple-700 border-solid border border-black rounded-xl">
          {courses != null
            ? courses.map((course) => {
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
            })
            : "aa"}
        </div>
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
      </div>
    </div>
  );
};

export default Home;
