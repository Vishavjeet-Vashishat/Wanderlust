import { AppError } from '../utils/appError.js';

// This is a factory function A factory function is a function that creates and returns another function or object.
const deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    // we used id because in route we have called this variable as id, it will change as per
    // name variable
    if (!doc) {
      return next(new AppError('No dcoument found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // we used id because in route we have called this variable as id, it will change as per
    // name variable
    if (!doc) {
      return next(new AppError('No dcoument found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { doc },
    });
  } catch (error) {
    next(error);
  }
};
const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { deleteOne, updateOne, createOne };
