const mongoose =  require('mongoose');
const jwt = require('jsonwebtoken'); 
const joi = require('joi'); 
const passwordComplexity = require('joi-password-complexity');


const userSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    lastName:{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    publishedTenders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tender'
    }],
    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    }]

})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY);
    return token;
}
const User = mongoose.model('user',userSchema);

const validateUser = (data)=>{
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        publishedTenders: joi.array().items(joi.object()),
        bids: joi.array().items(joi.object())
    })
    return schema.validate(data);
}



module.exports = {User, validateUser}