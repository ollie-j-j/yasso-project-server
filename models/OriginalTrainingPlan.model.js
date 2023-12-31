const { Schema, model } = require("mongoose");

const daySchema = new Schema({
  distance: {
    type: Number,
    required: true,
  },
  typeOfSession: {
    type: String,
    enum: ['easy', 'tempo', 'interval', 'rest', 'yasso', 'fartlek', 'steady', 'long run', 'threshold', 'recovery'],
    required: true
  },
  sessionDetails: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'missed'],
    default: 'pending'
  },
  sessionNotes: {
    type: String,
    default: ' '
  }
});

const originalTrainingPlanSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalPlan: {
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
  },
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema
}, {
  timestamps: true,
});

const OriginalTrainingPlan = model("OriginalTrainingPlan", originalTrainingPlanSchema);

module.exports = OriginalTrainingPlan;
