const Job = require("../model/jobmodel");

const JobController = {
    jobPost: async (req, res) => {
        try {
            const { tittle, description, requirements, salary, location, jobType, experience, positions, companyId } = req.body
            const userId = req.id;
            if (!tittle || !description || !requirements || !salary || !location || !jobType || !experience || !positions || !companyId) {
                return res.status(400).json({
                    message: "Something is missing",
                    success: false
                })
            }
            const job = await Job.create({
                tittle,
                description,
                requirements: requirements.split(","),
                salary: Number(salary),
                location,
                jobType,
                experiencelevel: experience,
                positions,
                company: companyId,
                created_by: userId
            })
            res.status(200).json({
                message: "New Job created successfully",
                job,
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    },
    getAllJobs: async (req, res) => {
        try {
            const keyword = req.query.keyword || "";
            const query = {
                $or: [
                    { tittle: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ]
            };
            const jobs = await Job.find(query).populate({
                path: "company"
            }).sort({ createdAt: -1 });
            if (!jobs) {
                res.status(404).json({
                    message: "Jobs not found",
                    success: false
                })
            }
            return res.status(200).json({
                jobs,
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    },
    getJobById: async (req, res) => {
        try {
            const jobId = req.params.id;
            const job = await Job.findById(jobId);
            if (!job) {
                res.status(404).json({
                    message: "Job not found",
                    success: false
                })
            };
            return res.status(200).json({
                job,
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    },
    getAdminJobs: async (req, res) => {
        try {
            const adminId = req.id;
            const jobs = await Job.find({ created_by: adminId });
            if (!jobs) {
                res.status(404).json({
                    message: "Job not found",
                    success: false
                })
            }
            return res.status(200).json({
                jobs,
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = JobController