const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../db");
exports.post = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: 999,
      currency: "CAD",
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports.postIsSubscribed = async (req, res) => {
  const email = req.body.email;
  try {
    const isSB = db.models.isSubscribed.findOne({ email: email });
    if (isSB != null && email != undefined) {
      return res.status(400).json({ error: "Already subscribed." });
    }

    db.models.isSubscribed({ email: email });
    res.status(200).json({ isSubscribed: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports.getIsSubscribed = async (req, res) => {
  const email = req.query.email;
  try {
    const isSB = db.models.isSubscribed.findOne({ email: email });
    if (isSB) {
      return res.status(200).json({ isSubscribed: true });
    }
    return res.status(200).json({ isSubscribed: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
