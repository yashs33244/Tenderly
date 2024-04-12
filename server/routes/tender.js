const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Tender } = require('../models/tender');
const User = require('../models/user');


// Middleware function to authenticate requests
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

router.post('/submit-form', authenticate, async (req, res) => {
  try {
    // Extract form data from request body
    const { nameOfWork, location, approxCost, bidSecurity, address, uploadDateTime, tenderNumber, phoneNumber, video, pdf } = req.body;
    
    // Retrieve user ID from decoded token attached to request
    const userId = req.user._id;
    
    // Create a new Tender object
    const newTender = new Tender({
      user: userId, 
      nameOfWork,
      location,
      approxCost,
      bidSecurity,
      address,
      uploadDateTime,
      tenderNumber,
      phoneNumber,
      video,
      pdf,
      active: true, // Set tender as active by default
      numberOfBids: 0
    });

    // Save the new tender to the database
    await newTender.save();

    // Respond with success message
    res.status(201).json({ message: 'Tender submitted successfully' });
  } catch (error) {
    console.error(`Error submitting tender: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/all-tenders', async (req, res) => {
  try {
    // Fetch all tenders from the database
    const allTenders = await Tender.find();

    // Respond with the list of tenders
    res.status(200).json(allTenders);
  } catch (error) {
    console.error(`Error fetching tenders: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
