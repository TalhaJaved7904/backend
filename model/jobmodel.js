const mongoose = require("mongoose")

const Jobschema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true
    },
    experiencelevel:[{
        type:Number,
        required:true
    }],
    location:{
        type:String,
        required: true,
    },
    jobType:{
        type:String,
        required:true
    },
    positions:{
        type:Number,
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    application:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Application",
        }
    ]
},{timestamps:true})

 const Job = mongoose.model("Job",Jobschema)
 module.exports = Job