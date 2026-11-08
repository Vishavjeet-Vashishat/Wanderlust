import express, { Router } from 'express';
import crypto from 'crypto';
import { protect } from '../controllers/authController.js';
import { createOrder, verifyPayment } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create-order/:tourId', protect, createOrder);
orderRouter.post('/verify-payment', protect, verifyPayment);

export { orderRouter };
