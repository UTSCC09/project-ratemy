const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../db");

exports.post = async (req, res) => {
  //Citation: https://stripe.com/docs/payments/payment-intents
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
    const existingUser = await db.models.isSubscribed.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: "Already subscribed." });
    }
    await db.models.isSubscribed.create({ email: email });

    return res.status(200).json({ isSubscribed: true });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getIsSubscribed = async (req, res) => {
  const email = req.query.email;

  try {
    const isSubscribed = await db.models.isSubscribed.findOne({ email: email });

    if (isSubscribed) {
      return res.status(200).json({ isSubscribed: true });
    }

    return res.status(200).json({ isSubscribed: false });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
