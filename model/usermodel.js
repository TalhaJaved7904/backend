const mongoose = require("mongoose")

const Userschema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"]
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is Required"],
            match: [/\S+@\S+\.\S+/, 'Invalid Email address']
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be atleat 8 characters long"]
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
        role: {
            type: String,
            enum: ['student', 'recruiter'],
            required: true,
        },
        profile: {
            bio: { type: String },
            skills: [{ type: String }],
            resume: { type: String }, // URL To resume file
            resumeOriginalName: { type: String },
            company: { type: mongoose.Schema.ObjectId, ref: 'Company' },
            profilePhoto: {
                type: String,
                default: "",
            }
        }
    }, { timestamps: true }
)

const Usermodel = mongoose.model('User', Userschema)
module.exports = Usermodel;