// server.js - Local / VPS server: static files from ./public + REST API from ./lib/api.js
// On Vercel, the API runs from api/handler.js and ./public is served as static files.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { handleApi } = require('./lib/api.js');
const { getDb } = require('./lib/db.js');
const { adminPassword } = require('./lib/auth.js');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN'
};

function serveFile(res, filePath, status = 200) {
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    const cache = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
    res.writeHead(status, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream', 'Cache-Control': cache, ...SECURITY_HEADERS });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (pathname.startsWith('/api/')) return handleApi(req, res);

  // Resolve inside ./public only (blocks path traversal)
  let filePath = path.normalize(path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname));
  if (!filePath.startsWith(PUBLIC_DIR + path.sep) && filePath !== PUBLIC_DIR) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) return serveFile(res, filePath);
    // Clean URLs: /lahore -> /lahore.html (same as Vercel cleanUrls)
    const htmlPath = filePath + '.html';
    fs.stat(htmlPath, (err2, stats2) => {
      if (!err2 && stats2.isFile()) return serveFile(res, htmlPath);
      if (path.extname(pathname)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not found');
      }
      serveFile(res, path.join(PUBLIC_DIR, 'index.html'));
    });
  });
});

getDb().then(db => {
  server.listen(PORT, () => {
    console.log(`🌿 Lahore Botanica running at http://localhost:${PORT}`);
    console.log(`   Database: ${db.kind === 'postgres' ? 'Postgres (DATABASE_URL)' : 'embedded PGlite (.data/pglite)'}`);
    console.log(`   Admin:    http://localhost:${PORT}/#admin`);
    if (!process.env.ADMIN_PASSWORD && adminPassword()) {
      console.log('   ⚠️  ADMIN_PASSWORD not set: local default password is "admin123"');
    }
  });
}).catch(err => {
  console.error('Database failed to start:', err);
  process.exit(1);
});
