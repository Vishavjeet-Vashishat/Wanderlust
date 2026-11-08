import express, { Router } from 'express';
import {
  getAllReviews,
  getReview,
  createReviews,
  updateReviews,
  deleteReviews,
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authController.js';

// Creating a Router
const reviewRouter = express.Router();

// AUTHENTICATED ROUTES
reviewRouter.use(protect);

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user', 'admin'), createReviews); // admin hatauna

// AUTHENTICATED AND AUTHOTRIZED ROUTES
reviewRouter
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReviews)
  .delete(restrictTo('user', 'admin'), deleteReviews);

// exporting the router

export { reviewRouter };
