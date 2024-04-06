const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send('User already registered');
        }

        const saltRounds = Number(process.env.SALT) || 10; // Default to 10 salt rounds if process.env.SALT is not defined
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });
        const token = newUser.generateAuthToken();
        res.setHeader('Authorization', `Bearer ${token}`);
        await newUser.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error');
    }
});



module.exports = router;
