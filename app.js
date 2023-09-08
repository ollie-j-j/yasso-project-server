require("dotenv").config();
require("./db");
const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

const originalTrainingPlanRoutes = require("./routes/originalTrainingPlan.routes");
app.use("/api/training/original", originalTrainingPlanRoutes);

require("./error-handling")(app);

module.exports = app;