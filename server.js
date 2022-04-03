const express =     require('express')
const env =         require('dotenv')
const bootcamps =   require('./routes/bootcamps')
const morgan =      require('morgan')
const connection =  require('./config/db')
const colors =      require('colors')
const cookieparser =require('cookie-parser')
const errorHandler =require('./middlewares/error')
const geocoder =    require('./utils/geoCoder')
const Courses  =    require('./routes/courses')
const auth     =    require('./routes/auth')
const reviewRouter =require('./routes/review')
const app =         express()
const senetize =    require('express-mongo-sanitize')
const helmet =      require('helmet')
const xss =         require('xss-clean')

//environment  variabbles
env.config({path:'./config/config.env'});
const PORT = process.env.PORT || 8000;
connection();

//middlerwares
if (process.env.NODE_ENV=='development') {
    app.use(morgan('dev'))   
}
app.use(express.json())
app.use(cookieparser())
//security
app.use(senetize());
app.use(helmet());
app.use(xss());
//routes
app.use('/',(req,res)=>{
    res.redirect('https://documenter.getpostman.com/view/18356172/UVyswvfK')
})
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', Courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews',reviewRouter);
// app.use('/api/v1/users', users);
// app.use('/api/v1/reviews', reviews);
app.use(errorHandler)

//server
app.listen(PORT,(err)=>{
    if(err){
        console.log(`eroor occured +${err}`);
    }
    console.log(`server running at port ${PORT} in ${process.env.NODE_ENV}`.red);
})