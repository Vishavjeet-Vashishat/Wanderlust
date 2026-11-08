import express, { Router } from 'express';
import {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from './../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';

import {
  getAllReviews,
  createReviews,
} from '../controllers/reviewController.js';

const tourRouter = express.Router(); // its a convention to call it a router. variable instead of router
//for particular resource like it could have been tourRouter

tourRouter
  .route('/')
  .get(getAllTour)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

export { tourRouter };
