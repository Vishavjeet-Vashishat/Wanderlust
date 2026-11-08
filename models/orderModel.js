import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'Tour',

      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'User',

      required: true,
    },

    price: {
      type: Number,

      required: true,

      min: 1,
    },

    currency: {
      type: String,

      enum: ['INR'],

      default: 'INR',
    },

    razorpayOrderId: {
      type: String,

      unique: true,

      sparse: true,
    },

    razorpayPaymentId: {
      type: String,

      default: undefined,
    },

    paymentStatus: {
      type: String,

      enum: ['pending', 'paid', 'failed', 'refunded'],

      default: 'pending',
    },
  },

  {
    timestamps: true,
  },
);

const Order = mongoose.model('Booking', orderSchema);

export { Order };
