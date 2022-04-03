const mongoose = require('mongoose')
const ReviewSchema = new mongoose.Schema({
    title:{
        required:[true,"PLease add a title"],
        type:String,
        trim:true,
        maxlength:100
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,"please add rating"]
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

ReviewSchema.index({bootcamp:1,user:1},{unique:true})

module.exports = mongoose.model("Review",ReviewSchema)