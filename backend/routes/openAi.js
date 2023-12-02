const { json } = require("express");
const db = require("../db");
const openai = require("openai");

// Set up OpenAI API key
const openaiApiKey = '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'; // Replace with your actual OpenAI API key
const openaiClient = new openai({ apiKey: openaiApiKey });
const mongoose = require("mongoose");
module.exports.post = async (req, res) => {
  const email = req.body.email;

  try {
    if (!email) {
      return res.status(400).json({ error: "Missing email." });
    }
    // Check if the user is subscribed
    const isSB = await db.models.isSubscribed.findOne({ email: email });

    // Check OpenAI count
    const openaiCountupdate = await db.models.OpenAiCount.findOne({ email: email });
    if (!openaiCountupdate) {
      const newOpenaiCount = await db.models.OpenAiCount.create({ email: email, count: 1 });
    }
    if (!isSB && openaiCountupdate && openaiCountupdate.count === 3) {
      return res.status(403).json({ error: "Not subscribed." });
    }
    const {courseId, professor } = req.body;
    let prompt = req.body.question;
    
    if (!courseId) {
      return res.status(400).json({ error: "Missing course id." });
    }

    
    if (!prompt) {
      return res.status(400).json({ error: "Missing question." });
    }

    
    const reviews = await db.models.review
      .find({ course_id: new mongoose.Types.ObjectId(courseId), ...(professor ? { professor } : {}) })
      .limit(10);

    
    prompt = `These are reviews about a course:\n${reviews}\n${prompt}`;

    const completion = await openaiClient.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    if (openaiCountupdate) {
      const updatedOpenaiCount = await db.models.OpenAiCount.updateOne({ email: email }, { count: openaiCountupdate.count + 1 });
    }

    res.json(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
