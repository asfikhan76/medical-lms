const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/testRoutes');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use('/api/questions', questionRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


module.exports = app;
