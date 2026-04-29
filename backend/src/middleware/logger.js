/**
 * Custom request logger middleware
 * Logs method, URL, status code, and response time
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const statusColor =
      res.statusCode >= 500
        ? '\x1b[31m' // Red
        : res.statusCode >= 400
          ? '\x1b[33m' // Yellow
          : res.statusCode >= 300
            ? '\x1b[36m' // Cyan
            : '\x1b[32m'; // Green

    console.log(
      `${timestamp} | ${statusColor}${res.statusCode}\x1b[0m | ${req.method} ${req.originalUrl} | ${duration}ms`
    );
  });

  next();
};

module.exports = requestLogger;
