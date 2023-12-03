import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AIField = ({ courseId }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a question!");
  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("Waiting for response ...");
    try {
      const accessToken = await getAccessTokenSilently();
      fetch("https://ratemybe-w9w1.onrender.com/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          question: question,
          email: user.email,
          courseId: courseId,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setMaxLimitReached(false);
          res.json().then((data) => {
            setAnswer(data);
          });
        } else if (res.status === 403) {
          setMaxLimitReached(true);
          setAnswer(
            "You've reached maximum AI calls. Upgrade to Pro for unlimited questions!"
          );
        }
      });
      setQuestion("");
    } catch (err) {
      console.error("Error sending POST request:", err);
    }
  };

  return (
    <div>
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <div className="">
          <div className="py-2 px-4 font-bold">AI Response: </div>
          <div className="py-2 px-4">{answer}</div>
        </div>

        <div>
          <label>
            <input
              className="border-2  w-full border-gray-400 block rounded py-2 px-4  hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
              type="question"
              value={question}
              onChange={handleChange}
              placeholder="Ask AI a question based on the reviews"
            />
          </label>
        </div>
        {maxLimitReached ? (
          <button
            className="rounded-xl px-2 py-3 w-fit mx-auto
            bg-purple-500 text-white font-bold hover:bg-purple-700"
            onClick={() => navigate("/upgrade")}
          >
            Upgrade to Pro!
          </button>
        ) : (
          <button
            className="rounded-xl px-2 py-3 w-fit mx-auto
            bg-purple-500 text-white font-bold hover:bg-purple-700"
            type="submit"
          >
            Ask AI
          </button>
        )}
      </form>
    </div>
  );
};

export default AIField;
