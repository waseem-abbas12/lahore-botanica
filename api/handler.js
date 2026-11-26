// Vercel serverless entry. vercel.json rewrites every /api/* request here as /api/handler?__path=<rest>
const { handleApi } = require('../lib/api.js');

module.exports = (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const rest = url.searchParams.get('__path');
  if (rest !== null) {
    url.searchParams.delete('__path');
    const qs = url.searchParams.toString();
    req.url = `/api/${rest.replace(/^\/+/, '')}${qs ? `?${qs}` : ''}`;
  }
  return handleApi(req, res);
};
