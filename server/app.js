const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/testRoutes');
app.use('/api/questions', questionRoutes);
app.use("/api/tests", testRoutes);


module.exports = app;
