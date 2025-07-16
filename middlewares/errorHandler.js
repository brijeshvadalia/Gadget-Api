module.exports = (err, req, res, next) => {
  // Mission-critical error logging
  console.error(`[${new Date().toISOString()}] Mission Failure:`, err.stack);
  
  // Classified error response
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Mission compromised!' : err.message;
  
  res.status(statusCode).json({
    success: false,
    status: 'failure',
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};