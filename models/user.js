const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"PLease enter the name"]
    },
    email:{
        type:String,
        match:[/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,"please enter valid email"],
        require:[true,"Please enter the Email"],
        unique:true
    },
    role:{
        type:String,
        enum:['user','publisher']
        ,default:'user'
    },
    password:{
        type:String,
        select:false,
        required:[true,"PPassword. is required"],
        minlength:6
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{
    timestamps:true
})

UserSchema.methods.getSignedJwtToken = function(){
    return jsonwebtoken.sign({_id:this._id,},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES       
    })
}

module.exports =  mongoose.model('User',UserSchema)