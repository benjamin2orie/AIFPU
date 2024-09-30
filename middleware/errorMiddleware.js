// creating custom error handling mesage

// the first function handle if the end-point does not exist

const notFound = (req, res, next) =>{
    const error = new error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);

}

// The second function handles the response to be displayed if the routes does not exist

const errorHandler = (err, req, res, next)=>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Customer Not Found';
    }
    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export{notFound, errorHandler};