const errorResponse = require('../utils/errorResponse')
const errorHandler = (err,req,res,next)=>{
    let newError = {...err};
    newError.message=err.message;

    if(err.name=="CastError"){
        const message=`bootcamp with id ${err.value} not found`
        newError=new errorResponse(404,message)
    }
    if(err.code==11000){
        const message=`Duplicate key erro`
        newError=new errorResponse(400,message)
    }
    if(err.name=="ValidationError"){
        const message=Object.values(err.errors).map(val=>val.message)
        newError=new errorResponse(404,message)
    }   
    
    return res.status(newError.statusCode||500).json({
        success:false,
        error:newError.message||"Server error" 
    })
}

module.exports = errorHandler;