import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const AIField = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [question, setQuestion] = useState({ question: "" });

  const handleChange = (e) => {
    setQuestion({ question: e.target.value });
    console.log(question);
  };

  return (
    <div>
      <form className="flex flex-col space-y-5">
        <div className="">
          <div className="py-2 px-4 font-bold">AI Response: </div>
          <div className="py-2 px-4">This is the AI response</div>
        </div>

        <div>
          <label>
            <input
              className="border-2  w-full border-gray-400 block rounded py-2 px-4  hover:border-gray-600 hover:border-2 focus:border-purple-700 focus:border-2 focus:outline-none"
              type="question"
              name="AIprompt"
              onChange={handleChange}
              placeholder="Ask AI a question based on the reviews"
            />
          </label>
        </div>
        <button
          className="rounded-xl px-2 py-3 w-fit mx-auto
            bg-purple-500 text-white font-bold hover:bg-purple-700 disabled:bg-purple-300 disabled:border-purple-300"
          type="submit"
        >
          Ask AI
        </button>
      </form>
    </div>
  );
};

export default AIField;
