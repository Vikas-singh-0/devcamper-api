const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geoCoder')

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
    },
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

//middlewares
//create slug from name
BootcampSchema.pre('save',function(next){
    // console.log("slugify ran");
    this.slug=slugify(this.name,{lower:true})
    next()
})

BootcampSchema.pre('save',async function(next){
    const loc = await geocoder.geocode(this.address)
    console.log(loc);
    this.location = {
        type:"Point",
        coordinates:[loc[0].longitude,loc[0].latitude],
        formattedAddress:loc[0].formattedAddress,
        street:loc[0].streetName,
        city:loc[0].city,
        state:loc[0].stateCode,
        zipcode:loc[0].zipcode,
        country:loc[0].countryCode
    }
    this.address = undefined
    next()
}) 

BootcampSchema.virtual('courses',{
    ref:'Course',
    localField:'_id',
    foreignField:'bootcamp',
    justOne:false
})

module.exports = mongoose.model('Bootcamp',BootcampSchema);