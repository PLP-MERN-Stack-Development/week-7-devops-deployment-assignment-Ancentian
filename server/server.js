// server.js - Main server file for the MERN blog application

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Initialize Express app (before Sentry!)
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Sentry (must come before any route)
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    //new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// Request and tracing handler must be set before any routes
//app.use(Sentry.Handlers.requestHandler());
//app.use(Sentry.Handlers.tracingHandler());

// Middleware to log request time
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on("finish", () => {
    const [sec, nano] = process.hrtime(start);
    const ms = (sec * 1000 + nano / 1e6).toFixed(2);
    console.log(`${req.method} ${req.originalUrl} - ${ms}ms`);
  });
  next();
});

// Other Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Import routes
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Sentry error handler (should come before custom error handler)
app.use(Sentry.Handlers.errorHandler());

// Custom error handler
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

module.exports = app;
