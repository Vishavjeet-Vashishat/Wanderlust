const globalErrorHandler = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500
   err.status = err.status || 'error'


    if (err.name === 'CastError') {

    err.statusCode = 400;

    err.status = 'fail';

    err.message = 'Invalid ID provided.';

  }

    if (err.code === 11000) {

    err.statusCode = 400;

    err.status = 'fail';

    err.message = 'Duplicate  field value. Please use a different value.';

  }

   if (err.name === 'ValidationError') {

  err.statusCode = 400;

  err.status = 'fail';

  const messages = Object.values(err.errors).map(

    error => error.message

  );

  err.message = messages.join('. ');

}

if (err.name === 'JsonWebTokenError') {

  err.statusCode = 401;

  err.status = 'fail';

  err.message = 'Invalid token. Please log in again.';

}

if (err.name === 'TokenExpiredError') {

  err.statusCode = 401;

  err.status = 'fail';

  err.message = 'Your token has expired. Please log in again.';

}

   res.status(err.statusCode).json({
    status: err.status,
    message: err.message

   })

}





export {globalErrorHandler}