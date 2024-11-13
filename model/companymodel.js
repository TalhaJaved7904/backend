const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,

    },
    website: {
        type: String,

    },
    location: {
        type: String,

    },
    logo: {
        type: String,  // URL

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }
}, { timestamps: true })

const Company = mongoose.model('Company', companySchema)
module.exports = Company