import mongoose from 'mongoose';
import { Tour } from '../models/tourModel.js';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },

    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      required: [true, 'A review must have a rating'],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    // REFERENCING DONE HERE
    tour: {
      type: mongoose.Schema.ObjectId, // ObjectId stores the ID of another document which is referenced
      ref: 'Tour', //     ref: 'Tour' tells Mongoose which model to use when populating the reference.
      required: [true, 'Review must belong to a tour'],
    },
    // so objectId and ref are very important keywords for referencing

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual Populating

reviewSchema.pre(/^find/, function () {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
});

// Static Method for calculating averageRatings

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },

    {
      $group: {
        _id: '$tour',

        nRating: { $sum: 1 },

        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,

      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,

      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', async function () {
  // this points to current review
  await this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function () {
  this.r = await this.model.findOne(this.getQuery());
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

export { Review };
