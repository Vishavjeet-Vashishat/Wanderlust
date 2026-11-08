import { kMaxLength } from 'buffer';
import mongoose from 'mongoose';
import { stringify } from 'querystring';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, ' A tour must have a name'], // mongoose built in validators for data validation
      unique: true,
      trim: true,
      maxLength: [40, 'A tour must have less or equal to 40 characters'], //  these also built in validators
      minLength: [10, 'A tour must have more or equal to 10 characters'], // these also built in validators
    },
    duration: {
      type: Number,
      required: [true, ' A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, ' A tour must have a group size'],
    },

    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (value) => Math.round(value * 10) / 10,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },

    description: {
      type: String,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDate: [Date],
    startLocation: {
      // Geo
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: ['Numbers'],
      address: String,
      description: String,
    },
    location: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: ['Numbers'],
        address: String,
        description: String,
        day: Number,
      },
    ],
    // EMBEDDING
    // You define an object directly inside another schema for embedding like this we did for guides in tour , there is no special syntax !
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// INDEXING FOR COMMON FIELDS
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ startLocation: '2dsphere' });

// Query Middleware
tourSchema.pre(/^find/, function () {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
});

// Virtual Populating of reviews in tour
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour', // foreignfield means the name of the field in other model , like tour is the field name in review model
  localField: '_id', // localfield means name of tour in its own tour model
});
const Tour = mongoose.model('Tour', tourSchema); // creating a model

export { Tour };
