const fs=require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

dotenv.config({path:'./config/config.env'})

const Bootcamps = require('./models/bootcamp_model')
const Courses = require('./models/course_model')


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
})

const BootcampsFile = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))
const CourseFile = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'))

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
const importCourseData  = async ()=>{
    try {
        await Courses.create(CourseFile)
        console.log(`bootcamps created`.green.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red);
    }
}
const deleteCourseData = async ()=>{
    try {
        await Courses.deleteMany()
        console.log(`bootcamps deleted`.red.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red);
    }
}

if (process.argv[2]== '-ibootcamps') {
    importData()
} else if(process.argv[2]=='-dbootcamps') {
    deleteData()
} else if (process.argv[2]== '-icourses') {
    importCourseData()
} else if(process.argv[2]=='-dcourses') {
    deleteCourseData()
}