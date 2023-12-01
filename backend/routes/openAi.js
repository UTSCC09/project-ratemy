const { json } = require("express");
const db = require("../db");
const openai = require("openai");

// Set up OpenAI API key
const openaiApiKey = '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'; // Replace with your actual OpenAI API key
const openaiClient = new openai({ apiKey: openaiApiKey });
const mongoose = require("mongoose");
module.exports.post = async (req, res) => {
  let prompt = req.body.question;
  let courseId = req.body.courseId || null;
  const professorFilter = req.body.professor ? { professor: req.body.professor } : {};
  if (courseId == null) {
      return res.status(400).json({ error: "Missing course id." });
  }
  try {
    // Check if the prompt is provided
    if (!prompt) {
      throw new Error("Uh oh, no prompt was provided");
    }
    
      const reviews = await db.models.review
        .find({ course_id: new mongoose.Types.ObjectId(courseId), ...professorFilter })
        .limit(10);
      
      
    
      
      // add reviews as string to prompt string before the prompt 
      prompt ="These are reviews about a course: \n" +reviews+"\n"+prompt;

      console.log(prompt);
      
      const completion = await openaiClient.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      // Send the response from OpenAI to the frontend
      res.json(completion.choices[0].message.content);
    
  } catch (err) {
    // Log the error and send a 500 Internal Server Error response
    console.error(err);
    res.status(500).json({ error: err.message });
  }
  
};
