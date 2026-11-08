// AppError creates/describes an error.It does not talk to the client.

//It does not call res.status(). and send JSON , It’s simply describing: “This particular error is a 401 application error.”

//  globalErrorHandler receives that error and sends the HTTP response. 

//so basically AppError is the error while globalErrorHandler handles the error.



class AppError extends Error {
    constructor( message, statusCode ) {
        super(message)
        this.statusCode = statusCode
        this.status = '${statusCode}' .startsWith('4') ? 'fail' : 'error'
        this.isOperational = true


        Error.captureStackTrace(this, this.constructor)

 }
}

export {AppError}