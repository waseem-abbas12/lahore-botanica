// lib/auth.js - Stateless admin session (HMAC-signed HttpOnly cookie)
const crypto = require('node:crypto');

const COOKIE = 'lb_admin';
const SESSION_HOURS = 12;
const IS_HOSTED = !!(process.env.VERCEL || process.env.NODE_ENV === 'production');

function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  // Local development convenience only. Hosted deployments MUST set ADMIN_PASSWORD.
  return IS_HOSTED ? null : 'admin123';
}

function secret() {
  return process.env.SESSION_SECRET || `lb::${adminPassword() || 'disabled'}::session`;
}

function sign(data) {
  return crypto.createHmac('sha256', secret()).update(data).digest('base64url');
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function createToken() {
  const payload = Buffer.from(JSON.stringify({
    role: 'admin',
    exp: Date.now() + SESSION_HOURS * 3600 * 1000
  })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  if (!safeEqual(sig, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.role === 'admin' && data.exp > Date.now();
  } catch {
    return false;
  }
}

function parseCookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach(part => {
    const i = part.indexOf('=');
    if (i > -1) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

function isAdmin(req) {
  return verifyToken(parseCookies(req)[COOKIE]);
}

function isSecure(req) {
  return req.headers['x-forwarded-proto'] === 'https' || !!req.socket?.encrypted;
}

function sessionCookie(req, token) {
  const parts = [`${COOKIE}=${token}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Max-Age=${SESSION_HOURS * 3600}`];
  if (isSecure(req)) parts.push('Secure');
  return parts.join('; ');
}

function clearCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

// Best-effort brute-force protection (per server instance)
const attempts = new Map();
function tooManyAttempts(ip) {
  const now = Date.now();
  const rec = attempts.get(ip) || { count: 0, first: now };
  if (now - rec.first > 15 * 60 * 1000) { rec.count = 0; rec.first = now; }
  return rec.count >= 8;
}
function recordFailure(ip) {
  const now = Date.now();
  const rec = attempts.get(ip) || { count: 0, first: now };
  rec.count += 1;
  attempts.set(ip, rec);
}

function checkPassword(input) {
  const pw = adminPassword();
  if (!pw) return { ok: false, disabled: true };
  return { ok: safeEqual(input || '', pw), disabled: false };
}

module.exports = {
  isAdmin, createToken, sessionCookie, clearCookie,
  checkPassword, tooManyAttempts, recordFailure, adminPassword
};
