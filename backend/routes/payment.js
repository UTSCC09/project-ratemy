const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
