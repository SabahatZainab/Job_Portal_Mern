import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Job', //relationship b/w job and applicants
        required:true,
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', //relationship b/w job and applicants
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});
export const Application = mongoose.model("Application", applicationSchema);