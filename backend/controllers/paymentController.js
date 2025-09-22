// backend/controllers/paymentController.js
// NOTE: This file implements a dummy payment endpoint.
// If you want Stripe test mode, uncomment the Stripe part and add STRIPE_SECRET to .env

// Dummy endpoint: marks payment as successful from client (useful for local dev)
exports.dummyPay = async (req, res) => {
  // client sends { orderData } and we simply respond success
  // In production you'd integrate with Razorpay/Stripe
  res.json({ success: true, message: 'Dummy payment successful (dev mode)' });
};

/* Uncomment this block and install stripe if you want to use Stripe test mode
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // amount in cents
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr', // or 'usd'
      payment_method_types: ['card']
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/
