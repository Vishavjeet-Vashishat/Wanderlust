import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import { AppError } from './utils/appError.js';
import { globalErrorHandler } from './controllers/errorController.js';
import path from 'path';

import { fileURLToPath } from 'url';

import { tourRouter } from './routes/tourRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { reviewRouter } from './routes/reviewRoutes.js';

import { orderRouter } from './routes/orderRoutes.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the public folder

app.use(express.static(path.join(__dirname, 'public')));

// 1) GLOBAL MIDDLEWARES

// Setting HTTP Headers with helmet
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
  // only 100 request can be done from one ip address in an hour
});

app.use('/api', limiter);

app.use(morgan('dev')); // middleware to log request

// Body Parsing
app.use(express.json());

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize()); // This middleware sanitizes incoming request data to help prevent malicious MongoDB operators, such as $ne, from being used in injection attacks.

// Data Sanitization against NoSQL XSS
app.use(xss());

// Serving Static files
app.use(express.static(`${__dirname}/public`)); // express middleware to servce static files

// 3) ROUTES
//app.get('/api/v1/tours', getAllTour);
//app.post('/api/v1/tours', createTour);
//app.get('/api/v1/tours/:id', getTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES
app.use('/api/v1/tours', tourRouter); // it basically means when these api are hit these middleware (routers) functions are called
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

// HANDLING UNHANDLED OR NOT PRESENT ROUTES
app.all('*', (req, res, next) => {
  // * here means every other route in the world except we have defined in the code

  next(new AppError(`Cant find the ${req.originalUrl} on this server}!`, 404));
});

app.use(globalErrorHandler);

export { app };
