const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{const db= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
        })
    console.log(`Mongo connected on ${db.connection.host} `);
    }catch (error){
        console.log(error);
    }
}

module.exports = connectDB;