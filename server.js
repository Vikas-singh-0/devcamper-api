const express = require('express')
const env = require('dotenv')

const bootcamps =require('./routes/bootcamps')

env.config({path:'./config/config.env'});
const app = express()
const PORT = process.env.PORT || 8000;

app.use('/api/v1/bootcamps', bootcamps);
// app.use('/api/v1/courses', courses);
// app.use('/api/v1/auth', auth);
// app.use('/api/v1/users', users);
// app.use('/api/v1/reviews', reviews);


app.listen(PORT,(err)=>{
    if(err){
        console.log(`eroor occured +${err}`);
    }
    console.log(`server running at port ${PORT} in ${process.env.NODE_ENV}`);
})