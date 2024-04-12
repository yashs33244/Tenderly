const mongoose = require("mongoose");
const joi = require("joi");

const bidSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tender',
        required: true
    },
    bidamount:{
        type: Number,
        required: true
    },
    uploadDateTime:{
        type: Date,
        // required: true
    } 
});

const Bid = mongoose.model('Bid',bidSchema);

const bidValidation = joi.object({
    user: joi.string().required(),
    tender: joi.string().required(),
    bidamount: joi.number().required(),
    uploadDateTime: joi.date().required()
});

const validateBid = (bidData) =>{
    return bidValidation.validate(bidData);
}

module.exports = {
    Bid,
    validateBid
}