// Import required modules
const mongoose = require('mongoose');
const Joi = require('joi');

// Define schema for tender form data
const tenderSchema = new mongoose.Schema({
    // _id: false,
    nameOfWork: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    approxCost: {
        type: String,
        required: true
    },
    bidSecurity: {
        type: String,
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
    }
});

const Tender = mongoose.model('Tender', tenderSchema);

// Define Joi schema for tender form data validation
const tenderValidationSchema = Joi.object({
    nameOfWork: Joi.string().required(),
    location: Joi.string().required(),
    approxCost: Joi.string().required(),
    bidSecurity: Joi.string().required(),
    address: Joi.string().required(),
    uploadDateTime: Joi.date().required(),
    tenderNumber: Joi.string().required()
});

// Validate tender data before saving to the database
const validateTender = (tenderData) => {
    return tenderValidationSchema.validate(tenderData);
};

module.exports = {Tender, validateTender};
