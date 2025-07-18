// utils/logger.js
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
const logFilePath = path.join(logDir, 'error.log');

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = {
  error: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${message}\n`;

    // Log to console
    console.error(logMessage);

    // Log to file
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) console.error('Failed to write to log file:', err);
    });
  }
};

module.exports = { logger };
