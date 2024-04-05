const express = require('express');
const router = express.Router();

const { Tender } = require('../models/tender');

// Middleware function to authenticate requests
const authenticate = (req, res, next) => {
  // Check if authentication credentials are present in the request
  // For example, you might check for a JWT token in the Authorization header
  const token = req.headers.authorization;

  // If authentication credentials are valid, proceed to the next middleware or route handler
  // Otherwise, respond with a 401 Unauthorized error
  if (token) {
    // Verify token here
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

router.post('/submit-form', authenticate, async (req, res) => {
  try {
    // Extract form data from request body
    const { nameOfWork, location, approxCost, bidSecurity, address, uploadDateTime, tenderNumber } = req.body;

    // Create a new Tender object
    const newTender = new Tender({
      nameOfWork,
      location,
      approxCost,
      bidSecurity,
      address,
      uploadDateTime,
      tenderNumber
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

router.get('/all-tenders', authenticate, async (req, res) => {
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
