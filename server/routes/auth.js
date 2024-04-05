const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const joi = require('joi'); // Import joi for validation

// Define validate function before using it
const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: joi.string().required().label('Password')
    })
    return schema.validate(data);
}

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        const validpassword = await bcrypt.compare(req.body.password, user.password);
        if (!validpassword) {
            return res.status(400).send('Invalid email or password');
        }

        const token = user.generateAuthToken();
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).send({
            data: token,
            message: 'User logged in successfully'
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ message: 'Internal server error' });
    }
});



module.exports = router;
