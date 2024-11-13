const Application = require("../model/applicationmodel");
const Job = require("../model/jobmodel");

const AplicationController = {
    applyJob: async (req, res) => {
        try {
            const userId = req.id;
            const {id:jobId} = req.params
            if(!jobId){
                return res.status(400).json({
                    message:"Job ID is required",
                    success:false
                })
            };
            const existingAplication = await Application.findOne({job:jobId,applicant:userId})
            if(existingAplication){
                return res.status(400).json({
                    message:"You have already applied for this job",
                    success:false
                })
            }
            const job = await Job.findById(jobId)
            if(!job){
                return res.status(404).json({
                    message:"job Not found",
                    succcess:false
                })
            }
            const newApplication =  await Application.create({
                job:jobId,
                applicant:userId
            })

            job.application.push(newApplication._id);
            await job.save();
            return res.status(201).json({
                message:"Job applied seccessfully",
                success:true
            })
        } catch (error) {
            console.log(error)
        }
    },
    getAppliedJobs: async (req, res) => {
        try {
            const userId = req.id;
            const application  =await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
                path:"job",
                options:{sort:{createdAt:-1}},
                populate:{
                    path:"company",
                    options:{sort:{createdAt:-1}},
                }
            });
            if(!application){
                return res.status(404).json({
                    message:"No application",
                    success:false
                })
            }
            return res.status(200).json({
                application,
                success:true
            })
        } catch (error) {
            console.log(error);
        }
    },
    getApplicants: async(req,res) => {
        try {
            const jobId = req.params.id;
            const job = await Job.findById(jobId).populate({
                path:"application",
                options:{sort:{createdAt:-1}},
                populate:{
                    path:"applicant"
                }
            })
            if(!job){
                return res.status(404).json({
                    message:"Job not found",
                    success:false
                })
            }
            return res.status(200).json({
                job,
                success:true
            })
        } catch (error) {
            console.log(error);
            
        }
    },
    updateStatus:async(req,res)=>{
        try {
            const {status} = req.body
            const applicationId = req.params.id;
            if(!status){
                return res.status(400).json({
                    message:"Status is required",
                    succcess:false
                })
            }

            const application = await Application.findOne({_id:applicationId})
            if(!application){
                return res.status(400).json({
                    message:"Application not found",
                    success:false
                })
            }
            
            application.status = status.toLowerCase();
            await application.save();

            return res.status(200).json({
                message:"Status Updated Successfully",
                success:true
            })
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = AplicationController