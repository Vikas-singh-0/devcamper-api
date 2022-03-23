const fs=require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

dotenv.config({path:'./config/config.env'})

const Bootcamps = require('./models/bootcamp_model')

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
})

const BootcampsFile = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))

const importData  = async ()=>{
    try {
        await Bootcamps.create(BootcampsFile)
        console.log(`bootcamps created`.green.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red);
    }
}
const deleteData = async ()=>{
    try {
        await Bootcamps.deleteMany()
        console.log(`bootcamps deleted`.red.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red);
    }
}

if (process.argv[2]== '-i') {
    importData()
} else if(process.argv[2]=='-d') {
    deleteData()
}