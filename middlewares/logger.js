const logger = (req,res,next)=>{
    req.home="home page";
    next()
}
module.exports=logger;