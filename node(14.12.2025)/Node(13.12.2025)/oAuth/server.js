const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require("dotenv").config();

const app = express();

/* ---------------- PASSPORT SETUP ---------------- */

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

/* ---------------- SESSION MIDDLEWARE ---------------- */

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

/* ---------------- PASSPORT MIDDLEWARE ---------------- */

app.use(passport.initialize());
app.use(passport.session());

/* ---------------- ROUTES ---------------- */

// Start Google Login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

// Auth Middleware
function requireAuth(req, res, next) {
  if (!req.user) return res.redirect("/");
  next();
}

// Profile Page
app.get("/profile", requireAuth, (req, res) => {
  res.send(`
    <h1>Welcome ${req.user.displayName}</h1>
    <img src="${req.user.photos[0].value}" />
    <p>Email: ${req.user.emails[0].value}</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect("/");
  });
});

// Home
app.get("/", (req, res) => {
  res.send(`<a href="/auth/google">Login with Google</a>`);
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
