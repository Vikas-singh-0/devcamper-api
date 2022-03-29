const mongoose = require('mongoose')
const CourseSchema = new mongoose.Schema({
    title:{
        required:[true,"PLease add a title"],
        type:String,
        trim:true
    },
    description:{
        required:[true,"PLease add a title"],
        type:String,
    },
    weeks:{
        required:[true,"PLease add number of weeks"],
        type:String,
    },
    tuition:{
        required:[true,"PLease add tution fee"],
        type:Number,
    },
    minimumSkill:{
        required:[true,"PLease add minimum skil required"],
        type:String,
        enum:['beginner','intermediate','advanced']
    },
    scholershipAvailable:{
        default:false,
        type:Boolean,
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    }
},{
    timestamps:true
})

CourseSchema.statics.getAverage = async function(bootcampId){
    // const mat=await this.aggregate([{$match:{bootcamp:bootcampId}}])
    // const grp = await this.aggregate([{$group:{_id:'$bootcamp'}}])
    const obj = await this.aggregate([
        {
            $match:{bootcamp:bootcampId}
        },
        {
            $group:{
                _id:'$bootcamp',
                averageCost :{$avg:'$tuition'}
            }
        }
    ]);
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
            averageCost:obj[0].averageCost
        })
    } catch (error) {
        console.log(`${error}`.pink.bold);
    }
}

//average cost after adding new course
CourseSchema.post('save',function(){
    console.log(`This is inside save function of post creation`.red.bold);
    console.log(this.bootcamp);
    this.constructor.getAverage(this.bootcamp)
})

//average cost before deleting new course
CourseSchema.pre('save',function(){

})

module.exports = mongoose.model('Course',CourseSchema)