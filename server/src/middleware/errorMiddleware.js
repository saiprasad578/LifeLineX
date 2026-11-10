function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, _req, res, _next) {
  console.error(error);
  const status = error.statusCode || 500;
  res.status(status).json({
    message: status === 500 ? "An unexpected server error occurred." : error.message
  });
}

module.exports = { notFound, errorHandler };
