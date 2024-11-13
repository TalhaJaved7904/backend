const Company = require("../model/companymodel")

const CompanyContoller = {
    register: async (req, res) => {
        try {
            const { companyName } = req.body
            if (!companyName) {
                return res.status(400).json({
                    message: "Company name required",
                    success: false
                })
            }
            let company = await Company.findOne({ name: companyName });
            if (company) {
                return res.status(400).json({
                    message: "You can't register same company",
                    success: false
                })
            }
            company = await Company.create({
                name: companyName,
                userId: req.id,
            })
            return res.status(201).json({
                message: "Company registered Successfully",
                company,
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    },
    getCompany: async (req, res) => {
        try {
            const userId = req.id;
            const companies = await Company.find({ userId });
            if (!companies) {
                return res.status(400).json({
                    message: "Companies not found",
                    success: false
                })
            }
            return res.status(200).json({
                companies,
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    },
    getCompanyById: async (req, res) => {
        try {
            const companyId = req.params.id;
            const company = await Company.findById(companyId);
            if (!company) {
                return res.status(400).json({
                    message: "Company not found",
                    success: false
                })
            }

            return res.status(200).json({
                company,
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    },
    updateCompany: async (req, res) => {
        try {
            const { name, description, website, location } = req.body;
            const file = req.file;
            // cloudinary

            const updateData = { name, description, website, location }

            const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

            if (!company) {
                return res.status(400).json({
                    message: "Company Not Found",
                    success: false
                })
            }
            return res.status(200).json({
                message: "Company information updated",
                success: true
            })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = CompanyContoller