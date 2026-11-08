import { error } from 'console';
import { Tour } from './../models/tourModel.js';
import { APIfeatures } from '../utils/apiFeatures.js';
import { AppError } from '../utils/appError.js';
import {
  deleteOne,
  updateOne,
  createOne,
} from '../controllers/handlerFactory.js';

const getAllTour = async (req, res, next) => {
  try {
    // EXECUTE THE QUERY
    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      data: { tours },
    });
  } catch (error) {
    next(error);
  }
};

const getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('reviews');
    // we used id because in route we have called this variable as id, it will change as per
    // name variable

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    next(error);
  }
};

const createTour = createOne(Tour);

const updateTour = updateOne(Tour);

const deleteTour = deleteOne(Tour);

/* const updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // we used id because in route we have called this variable as id, it will change as per
    // name variable

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    next(error);
  }
}; */

/* 
const deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    // we used id because in route we have called this variable as id, it will change as per
    // name variable
    
    res.status(200).json({
      status: 'success',
      data: null,
      });
      } catch (error) {
        next(error);
        }
        };
        */

export { getAllTour, getTour, createTour, updateTour, deleteTour };
