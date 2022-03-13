const mongoose = require('mongoose')

const BootcampSchema = new mongoose.Schema({
    name:{
        required:[true,"Please add a name"],
        type:String,
        unique:true,
        trim:true,
        maxlength:[50,"Name cannot be more than 50 chars"]
    },
    slug:String,
    description:{
        required:[true,"Please add a description"],
        type:String,
        trim:true,
        maxlength:[500,"Description cannot be more than 500 chars"]    
    },
    website:{
        type:String,
        unique:true,
        match:[/((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,"PLease check the websiite name"],
        trim:true,
        maxlength:[50,"Name cannot be more than 50 chars"]
    },
    email:{
        type:String,
        match:[/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,"please enter valid email"],
        require:true
    },
    address:{
        type:String,
        require:[true,"PLease add  an address"]
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
          index:'2dsphere'
        },
        formattedAddress:String,
        zipcode:Number,
        city:String,
        country:String,
        street:String,
        state:String
    },
    careers:{
        type:[String],
        required:true
    },
    averageRating:{
        type:Number,
        min:[1,"Please enter rating more than 1"],
        max:[10,"Please enter rating less than 10"]
    },
    averageCost:Number,
    photo:{
        type:String,
        default:"no-photo.jpg"
    },
    housing:{
        type:Boolean,
        default:false
    },
    jobAssistance:{
        type:Boolean,
        default:false
    },
    jobGurantee:{
        type:Boolean,
        default:false
    },
    acceptGI:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Bootcamp',BootcampSchema);