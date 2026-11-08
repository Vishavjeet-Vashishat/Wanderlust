import { Review } from '../models/reviewModel.js';
import { deleteOne, updateOne } from '../controllers/handlerFactory.js';
import { AppError } from '../utils/appError.js';

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({
      status: 'sucess',
      result: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('No review found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',

      data: {
        review,
      },
    });
  } catch (error) {
    next(error);
  }
};
const createReviews = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: {
        newReview,
      },
    });
  } catch (error) {
    next();
  }
};

const deleteReviews = deleteOne(Review);
const updateReviews = updateOne(Review);

export {
  getAllReviews,
  getReview,
  createReviews,
  deleteReviews,
  updateReviews,
};
