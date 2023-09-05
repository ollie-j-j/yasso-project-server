const express = require("express");
const router = express.Router();
const OriginalTrainingPlan = require('../models/OriginalTrainingPlan.model');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// POST - add original training plan

router.post('/add-plan', isAuthenticated, (req, res) => {
    const userId = req.payload._id;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    if (!monday || !tuesday || !wednesday || !thursday || !friday || !saturday || !sunday) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const originalTrainingPlan = new OriginalTrainingPlan({
        userId,
        originalPlan: {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        },
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    });

    originalTrainingPlan.save()
        .then(savedPlan => {
            return User.findById(userId)
                .then(user => {
                    user.originalTrainingPlan = savedPlan._id;
                    return user.save();
                })
                .then(() => {
                    res.status(201).json(savedPlan);
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Error creating the training plan" });
        });
});



// GET - current plan

router.get('/current-plan', isAuthenticated, (req, res) => {
    const userId = req.payload._id;

    OriginalTrainingPlan.findOne({ userId })
        .then(trainingPlan => {
            if (!trainingPlan) {
                return res.status(404).json({ error: "No training plan found for the current user" });
            }

            res.json(trainingPlan);
        })
        .catch(error => res.status(500).json({ error: "Error fetching the training plan" }));
});


// PUT - updating the training plan

router.put('/update-plan/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const userId = req.payload._id;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    if (!userId || !monday || !tuesday || !wednesday || !thursday || !friday || !saturday || !sunday) {
        return res.status(400).json({ error: "All fields are required" });
    }

    OriginalTrainingPlan.findByIdAndUpdate(id, {
        userId,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    }, { new: true })
        .then(updatedTrainingPlan => res.status(200).json(updatedTrainingPlan))
        .catch(error => res.status(500).json({ error: "Error updating the training plan" }));
});


// DELETE

router.delete('/delete-plan/:userId', isAuthenticated, (req, res) => {
    const userId = req.params.userId;
    let originalTrainingPlanId;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        originalTrainingPlanId = user.originalTrainingPlan;
        console.log('User:', user);
        console.log('Original Training Plan ID:', originalTrainingPlanId);

        user.originalTrainingPlan = null;
        return user.save();
      })
      .then(() => {
        return OriginalTrainingPlan.findByIdAndRemove(originalTrainingPlanId);
      })
      .then(() => {
        res.json({
          message: 'Plan is removed successfully.',
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Check the server console" });
      });
});

module.exports = router;


