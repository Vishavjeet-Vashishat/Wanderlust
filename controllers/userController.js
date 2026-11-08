import multer from 'multer';
import sharp from 'sharp';
import path from 'node:path';
import { User } from '../models/userModel.js';
import { AppError } from '../utils/appError.js';
import { deleteOne, updateOne } from '../controllers/handlerFactory.js';

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/img/users'));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
  },
});

const multetFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image ! Please upload only images', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multetFilter });

const uploadUserPhoto = upload.single('photo');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
};

const deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    // 1) Create a error if user POSTS Password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password update.Please use /updateMyPassword',
          400,
        ),
      );
    }
    // 2) Filtered the incoming req object from unwanted field name that are not allowed to be updated by user
    const filterBody = filterObj(req.body, 'name', 'email'); // only allowing the user to update name and email as we filter incoming req object
    if (req.file) filterBody.photo = req.file.filename;

    // 3) Update User document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = updateOne(User); // For admin

const deleteUser = deleteOne(User);

export {
  getAllUser,
  getUser,
  createUser,
  deleteMe,
  deleteUser,
  updateUser,
  updateMe,
  uploadUserPhoto,
};
