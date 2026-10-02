const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
