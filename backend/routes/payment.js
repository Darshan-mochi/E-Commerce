// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/dummy', protect, paymentController.dummyPay);

// If using Stripe:
// router.post('/create-payment-intent', protect, paymentController.createPaymentIntent);

module.exports = router;
