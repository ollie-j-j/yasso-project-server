const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const uploader = require('../config/cloudinary.config');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// GET
router.get('/profile', isAuthenticated, (req, res) => {
    const userId = req.payload._id;
    
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ data: user });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


// POST

router.post("/upload", uploader.single("profileImage"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
  
    res.json({ profileImage: req.file.path });
});


// PUT

router.put('/edit-profile', isAuthenticated, uploader.single('profileImage'), (req, res) => {
    const userId = req.payload._id;
    const { username, email } = req.body;
    
    const updatedData = { username, email };
    if (req.file) {
        updatedData.profileImage = req.file.path;
    }

    User.findByIdAndUpdate(userId, updatedData, { new: true })
        .then(updatedUser => {
            res.json({ data: updatedUser });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});



module.exports = router;