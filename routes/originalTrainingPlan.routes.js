const express = require("express");
const router = express.Router();
const OriginalTrainingPlan = require('../models/OriginalTrainingPlan.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post('/add-plan', isAuthenticated, (req, res) => {
    const userId = req.payload._id;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    if (!userId || !monday || !tuesday || !wednesday || !thursday || !friday || !saturday || !sunday) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const originalTrainingPlan = new OriginalTrainingPlan({
        userId,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    });

    originalTrainingPlan.save()
        .then(trainingPlan => res.status(201).json(trainingPlan))
        .catch(error => res.status(500).json({ error: "Error creating the training plan" }));
});

module.exports = router;