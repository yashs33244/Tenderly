// Import required modules
const mongoose = require('mongoose');
const Joi = require('joi');



// Define schema for tender form data
const tenderSchema = new mongoose.Schema({
    // _id: false,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nameOfWork: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    approxCost: {
        type: Number,
        required: true
    },
    bidSecurity: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    uploadDateTime: {
        type: Date,
        required: true
    },
    tenderNumber: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    video: {
        type: String
    },
    pdf: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    numberOfBids: {
        type: Number,
        default: 0
    }
});

const Tender = mongoose.model('Tender', tenderSchema);

// Define Joi schema for tender form data validation
const tenderValidationSchema = Joi.object({
    nameOfWork: Joi.string().required(),
    location: Joi.string().required(),
    approxCost: Joi.number().required(),
    bidSecurity: Joi.number().required(),
    address: Joi.string().required(),
    uploadDateTime: Joi.date().required(),
    tenderNumber: Joi.string().required(),
    phoneNumber: Joi.string(),
    video: Joi.string(),
    pdf: Joi.string(),
    active: Joi.boolean(),
    numberOfBids: Joi.number()
});


// Validate tender data before saving to the database
const validateTender = (tenderData) => {
    return tenderValidationSchema.validate(tenderData);
};

module.exports = {Tender, validateTender};
