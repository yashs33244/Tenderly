const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Bid } = require('../models/bid');
const { Tender } = require('../models/tender');
const mongoose  = require('mongoose');

// Middleware to authenticate the user
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

router.post('/submit-bid/:tenderId',authenticate, async (req, res) => {

    try {
        
        const { bidAmount } = req.body;
        const tenderId = req.params.tenderId;
        const userId = req.user._id;

        // Validate bid amount
        if (!bidAmount || isNaN(bidAmount)) {
            return res.status(400).json({ message: 'Invalid bid amount' });
        }

        // Validate tender ID
        if (!mongoose.Types.ObjectId.isValid(tenderId)) {
            return res.status(400).json({ message: 'Invalid tender ID' });
        }

        // Create a new bid
        const newBid = new Bid({
            user: userId,
            tender: tenderId,
            bidamount: bidAmount,
            bidDateTime: new Date()
        });
        await newBid.save();

        // Update the tender with the new bid count
        await Tender.findByIdAndUpdate(tenderId, { $inc: { numberOfBids: 1 } });

        res.status(201).json({ message: 'Bid submitted successfully' });
    } catch (error) {
        console.error(`Error submitting bid: ${error}`);
        res.status(500).json({ message: 'Error submitting bid' });
    }
});


module.exports = router;
