const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/testRoutes');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resultRoutes = require("./routes/resultRoutes");

const subjectRoutes = require("./routes/subjectRoutes");
const systemRoutes = require("./routes/systemRoutes");
const subSystemRoutes = require("./routes/subSystemRoutes");
const topicRoutes = require("./routes/topicRoutes");



// Routes
app.use('/api/questions', questionRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/results", resultRoutes);

app.use("/api/subjects", subjectRoutes);
app.use("/api/systems", systemRoutes);
app.use("/api/subsystems", subSystemRoutes);
app.use("/api/topics", topicRoutes);




module.exports = app;
