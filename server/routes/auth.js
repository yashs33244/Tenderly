const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const joi = require('joi'); // Import joi for validation
const jwt = require('jsonwebtoken');

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

const authenticate = async (req, res, next) => {
  
    const token = req.headers.authorization;
  
    if (token && token.startsWith('Bearer ')) {
      // Extract token without 'Bearer ' prefix
      const tokenValue = token.split(' ')[1];
      
      try {
        // Verify token
        const decodedToken = jwt.verify(tokenValue, process.env.JWTPRIVATEKEY);
        
        // Attach user information to request object
        req.user = decodedToken;
        next();
      } catch (error) {
        console.error(`Error verifying token: ${error}`);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized: Token missing or invalid format' });
    }
  };

  router.get('/profile',async (req, res) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).send('Unauthorized: Token missing');
        }
        const userId = req.user;
        const userEmail = await User.findOne({ userId });
        res.status(200).send(userEmail);

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal server error');
    }
});



module.exports = router;
