const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors(
    {
    origin: process.env.CLIENT_URL,
    credentials: true
}
));
app.use(express.json());

const testRoutes = require('./routes/testRoutes');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resultRoutes = require("./routes/resultRoutes");

const subjectRoutes = require("./routes/subjectRoutes");
const systemRoutes = require("./routes/systemRoutes");
const subSystemRoutes = require("./routes/subSystemRoutes");
const topicRoutes = require("./routes/topicRoutes");
const questionRoutes = require('./routes/questionRoutes');


// temprary routes
const questionUploadRoutes = require("./routes/questionUploadRoute");
const subjectUploadRoutes = require("./routes/subjectUploadRoute");
const dashboardRoutes = require('./routes/dashboardRoutes');


// Routes Midleware
app.use("/api/tests", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/results", resultRoutes);

app.use("/api/subjects", subjectRoutes);
app.use("/api/systems", systemRoutes);
app.use("/api/subsystems", subSystemRoutes);
app.use("/api/topics", topicRoutes);

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/questions', questionRoutes);

// temprary routes
app.use("/api/subjectUpload", subjectUploadRoutes);
app.use("/api/questionUpload", questionUploadRoutes);



module.exports = app;
