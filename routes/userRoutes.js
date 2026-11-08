import express, { application } from 'express';
import {
  getAllUser,
  getUser,
  createUser,
  deleteMe,
  deleteUser,
  updateUser,
  updateMe,
  uploadUserPhoto,
} from './../controllers/userController.js';
import {
  signUp,
  login,
  protect,
  forgotPassword,
  updatePassword,
  restrictTo,
} from '../controllers/authController.js';

const userRouter = express.Router(); // same router name variable

//  ROUTES ( USING OF THESE ROUTES CANNBE DONE BY ANYONE)
userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);

// AUTHENTICATED ROUTES
userRouter.use(protect); // instead of adding protect in each route we have added here as middleware runs in
// sequence and everyb route after this will automatically use this protect middleware for auth

userRouter.patch('/updateMyPassword', updatePassword);
userRouter.patch('/updateMe', uploadUserPhoto, updateMe);
userRouter.delete('/deleteMe', deleteMe);

// AUTHENTICATED AND AUTHORIZED ROUTES FOR ONLY ADMIN
userRouter.use(restrictTo('admin'));

userRouter.route('/').get(getAllUser).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser); // use /:variable to target particular resource

export { userRouter };
