const {constants} = require('../constants')

const errorHandler = (err, req, res, next) =>{
 const statusCode = req.statusCode? req.statusCode : 500;
 switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({
            Title : "Validation error",
            message: err.message, 
            stackTrace: err.stack
        }); 
    break;

    case constants.NOT_FOUND:
        res.json({
            Title : "Not Found",
            message: err.message, 
            stackTrace: err.stack
        }); 
    break;

    case constants.UNAUTHORIZED_USER:
        res.json({
            Title : "un Authorized",
            message: err.message, 
            stackTrace: err.stack
        }); 
    break;

    case constants.FORBIDDEN:
        res.json({
            Title : "forbidden",
            message: err.message, 
            stackTrace: err.stack
        }); 
    break;

    case constants.SERVER_ERROR:
        res.json({
            Title : "Server error",
            message: err.message, 
            stackTrace: err.stack
        }); 
    break;

    default:
        console.log("No error , All good")
        break;

 }

}

module.exports = errorHandler