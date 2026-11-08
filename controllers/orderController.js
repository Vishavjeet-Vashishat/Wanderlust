import { Tour } from '../models/tourModel.js';
import crypto from 'node:crypto';
import { Order } from '../models/orderModel.js';
import { AppError } from '../utils/appError.js';
import Razorpay from 'razorpay';
import { Mongoose } from 'mongoose';

// Razorpay Initialization
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

function verifyPaymentSignature(orderId, paymentId, receivedSig, keySecret) {
  const body = orderId + '|' + paymentId;
  const expectedSig = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex');
  // timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(expectedSig, 'hex'),
    Buffer.from(receivedSig, 'hex'),
  );
}

const createOrder = async (req, res, next) => {
  try {
    // Find the tour
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) {
      return next(new AppError(404, 'Tour not found'));
    }

    // Create  Razororpay Order for this particular  Tour and User
    const razorpayOrder = await instance.orders.create({
      amount: tour.price,
      currency: 'INR',
    });
    // Save the order details in database

    const order = await Order.create({
      tour: tour._id,

      user: req.user.id,

      price: razorpayOrder.amount / 100,

      currency: razorpayOrder.currency,

      razorpayOrderId: razorpayOrder.id,
    });

    // Send the response to frontend
    return res.status(201).json({
      status: 'success',

      data: {
        order,

        razorpayOrderId: razorpayOrder.id,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    //  Get Paymenty details from frontend
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    // Find the Order

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) return next(new AppError('Order not found', 404));

    // Verifying payment signature to confirm payment is authentic
    const isValid = verifyPaymentSignature(
      order.razorpayOrderId, // <-- from YOUR database
      razorpay_payment_id,
      razorpay_signature,
      process.env.RAZORPAY_SECRET,
    );

    if (isValid) {
      // Update order status to PAID in your Database
      order.paymentStatus = 'paid';
      order.razorpayPaymentId = razorpay_payment_id;
      await order.save();
    } else {
      return next(new AppError('Signature Verification failed', 400));
    }

    // Send confirmation email / trigger fulfilment
  } catch (error) {
    next(error);
  }
};

export { createOrder, verifyPayment };
