require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const app = express();
const apiRouter = require('./routes/api');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middleware
app.use(express.json());

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connection established'))
  .catch(err => console.error('Database connection failed:', err));

// Sync models
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync failed:', err));

// Routes
app.use('/api', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});
// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`IMF Gadget API active on port ${PORT}`);
});