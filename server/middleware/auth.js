const jwt = require('jsonwebtoken');
const User = require('../models/User');

const COOKIE_NAME = 'token';

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true, // not readable by JS -> protects against XSS token theft
    secure: true, // required for sameSite: 'none' to work; both Render and Vercel serve HTTPS
    sameSite: 'none', // frontend (Vercel) and backend (Render) are different domains, so this is required for the cookie to be sent cross-site
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME);
}

// Requires a valid, logged-in user. Rejects with a generic 401 otherwise.
async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'Not authenticated' });

    req.user = user; // full mongoose doc; password is never selected by default
    next();
  } catch {
    // Covers expired/invalid/tampered tokens without leaking which one.
    return res.status(401).json({ error: 'Not authenticated' });
  }
}

// Restricts a route to one or more roles. Use after requireAuth.
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    next();
  };
}

// Attaches req.user if a valid session cookie is present, but never blocks
// the request. Used on the public booking endpoint so a logged-in patient's
// booking gets linked to their account, while anonymous bookings still work.
async function attachUserIfPresent(req, _res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return next();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (user) req.user = user;
  } catch {
    // Silently ignore bad/expired tokens here -- this endpoint stays public.
  }
  next();
}

module.exports = {
  signToken,
  setAuthCookie,
  clearAuthCookie,
  requireAuth,
  requireRole,
  attachUserIfPresent,
};
