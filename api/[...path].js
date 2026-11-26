// Vercel serverless entry: every /api/* request goes through the shared router
const { handleApi } = require('../lib/api.js');

module.exports = (req, res) => handleApi(req, res);
